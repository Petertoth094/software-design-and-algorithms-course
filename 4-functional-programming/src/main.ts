import {
  Either,
  fromPromise,
  ap,
  right,
  getOrElse,
  flatten,
  left,
} from './fp/either';
import {pipe} from './fp/utils';
import {fetchClient, fetchExecutor} from './fetching';
import {ClientUser, ExecutorUser} from './types';
import {fromNullable, isSome} from './fp/maybe';
import {Ord, fromCompare, ordNumber} from './fp/ord';
import {distance} from './utils';

type Response<R> = Promise<Either<string, R>>;

const rewardPredicate = (client1: ClientUser, client2: ClientUser) =>
  ordNumber.compare(client2.reward, client1.reward);
const sortByHighestReward: Ord<ClientUser> = fromCompare(rewardPredicate);

const distancePredicate =
  (executor: ExecutorUser) => (client1: ClientUser, client2: ClientUser) =>
    ordNumber.compare(
      distance(client2.position, executor.position),
      distance(client1.position, executor.position)
    );

const sortbyLowestDistance = (executor: ExecutorUser) =>
  fromCompare(distancePredicate(executor));

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> =>
  fromPromise(
    fetchClient().then((clients) =>
      clients.map((client) => ({
        ...client,
        demands: fromNullable(client.demands),
      }))
    )
  );

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

export const show =
  (sortBy: SortBy) =>
  (clients: Array<ClientUser>) =>
  (executor: ExecutorUser): Either<string, string> => {
    const numClients = clients.length;

    const clientTable = (client: ClientUser) =>
      `name: ${client.name}, distance: ${distance(
        client.position,
        executor.position
      )}, reward: ${client.reward}`;

    const sorting =
      sortBy === SortBy.distance
        ? sortbyLowestDistance(executor)
        : sortByHighestReward;

    const sortedClients = pipe(
      clients,
      (clients: Array<ClientUser>) => clients.sort(sorting.compare),
      (clients: Array<ClientUser>) =>
        clients.filter((client) => {
          //TODO refactor to avoid if
          const demands = client.demands;
          if (isSome(demands)) {
            const executorPossibilities = new Set(executor.possibilities);
            return demands.value.some((demand) =>
              executorPossibilities.has(demand)
            );
          }

          return true;
        }),
      (clients: Array<ClientUser>) =>
        sortBy === SortBy.distance ? clients.reverse() : clients,
      (clients: Array<ClientUser>) =>
        clients.map((client) => clientTable(client))
    );

    const sorterString: string =
      sortBy === SortBy.reward ? 'highest reward' : 'distance to executor';

    const firstLine =
      sortedClients.length === numClients
        ? 'This executor meets all demands of all clients!'
        : sortedClients.length === 0
        ? 'This executor cannot meet the demands of any client!'
        : `This executor meets the demands of only ${sortedClients.length} out of ${numClients} clients`;

    const secondLine = `\nAvailable clients sorted by ${sorterString}:`;

    const result =
      sortedClients.length === 0
        ? left(firstLine)
        : right([firstLine, secondLine, ...sortedClients].join('\n'));

    return result;
  };

export const main = (sortBy: SortBy): Promise<string> =>
  Promise.all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) =>
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    );

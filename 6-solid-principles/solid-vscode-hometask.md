project https://github.com/microsoft/vscode

\***_ SRP _**
Good example:

- vscode-main\extensions\github\src\util.ts DisposableStore class
- vscode-main\src\vs\editor\common\textModelEvents.ts: ModelRawLineChanged, ModelRawLinesDeleted, ModelRawLinesInserted -each class has one responsibility

Bad example: Too much logic in one class

- vscode-main\extensions\git\src\model.ts Model class I think has too much logic (900 lines)
- vscode-main\src\vs\editor\browser\widget\codeEditorWidget.ts same with CodeEditorWidget (1800 lines)

**_ OCP _**
Good example:

- vscode-main\src\vs\base\browser\ui\list\listView.ts ElementsDragAndDropData,ExternalElementsDragAndDropData,NativeDragAndDropData classes
- vscode-main\src\vs\workbench\services\userDataProfile\browser\extensionsResource.ts ExtensionsResourceImportTreeItem, ExtensionsResourceExportTreeItem extends ExtensionsResourceTreeItem classes
- vscode-main\src\vs\workbench\services\userDataProfile\browser\globalStateResource.ts GlobalStateResourceImportTreeItem, GlobalStateResourceExportTreeItem extends GlobalStateResourceTreeItem classes

Bad example:

- vscode-main\extensions\git\src\repository.ts Resource class with getStatusText,getIconPath functions
- vscode-main\src\vs\editor\common\cursorCommon.ts static shouldRecreate function

**_ LSP _**
Good example

- vscode-main\src\vs\workbench\contrib\testing\browser\testExplorerActions.ts HideTestAction, UnhideTestAction, UnhideAllTestsAction, DebugAction .. classes in the file extends Action2

Bad example

- vscode-main\src\vs\editor\browser\viewParts\scrollDecoration\scrollDecoration.ts class ScrollDecorationViewPart extends ViewPart
- vscode-main\src\vs\editor\browser\viewParts\lines\viewLines.ts line 186 - 217 onConfigurationChanged()
- vscode-main\src\vs\editor\browser\viewParts\rulers\rulers.ts class Rulers extends ViewPart, line 39 returns true, viewPart would return false

**_ ISP _**
Good example:

- vscode-main\src\vs\workbench\api\common\extHost.protocol.ts MainThreadClipboardShape, MainThreadCommandsShape, MainThreadCommentsShape extends IDisposable

Bad example: (client should never be forced to implement an interface that it does not use, or clients should not be forced to depend on methods that they do not use)

- vscode-main\src\vs\base\test\common\troubleshooting.ts class DisposableTracker markAsSingleton function has // noop
- vscode-main\src\vs\editor\browser\viewParts\scrollDecoration\scrollDecoration.ts class ScrollDecorationViewPart line 38 public override dispose, line 83 prepareRender()
- vscode-main\src\vs\editor\standalone\browser\standaloneCodeEditor.ts StandaloneDiffEditor has multiple methods that overrides the original

**_ DIP _**
Good example:
vscode-main\src\vs\base\parts\ipc\common\ipc.electron.ts line 10 - 34 the private sender: Sender in the Protocol constructor

Bad example:
vscode-main\src\vs\workbench\browser\actions\listCommands.ts line 158,173 multiple instanceof operator

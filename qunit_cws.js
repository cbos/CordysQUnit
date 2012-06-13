test("QUnit - CWS initialization", function(){
  ok(getCWSSystemEnvironment()!=null, "CWS Initialized");
});

var __gInitializedCWS = false;
function __initializeCWS__()
{
  if(!__gInitializedCWS)
  {
    application.importType("com.cordys.cws.umf.CWSEnvironmentFactory");
    application.importType("com.cordys.cws.umf.common.Definition");
    application.importType("com.cordys.cws.umf.common.Framework");
    application.importType( "com.cordys.cws.runtime.types.workspace.Workspace" );

    var environmentFactory = CWSEnvironmentFactory.getInstance();
    environmentFactory._useParentApplication( CordysRoot.application );
    environmentFactory._setWorkingInBUUI();  
    __gInitializedCWS = true;
  }
}

function __getCWSEnvironmentFactory__()
{
  __initializeCWS__();
  return CWSEnvironmentFactory.getInstance();
}

function getCWSSystemEnvironment()
{
  var organizationalContext = __getCWSEnvironmentFactory__()._getOrganizationalContext( application.organization );
  return organizationalContext.getSystemEnvironment();
}

function getEnvironmentByWorkspaceName(workspaceName, organization)
{
  var targetOrganization;
  if(organization)
  {
    targetOrganization = organization;
  }
  else
  {
    targetOrganization = application.getParameter( "organization" ) || application.organization;
  }
  return __getCWSEnvironmentFactory__().getEnvironmentByWorkspaceName(workspaceName, targetOrganization);
}

function createWorkspace(name)
{
  application.importType("com.cordys.cws.runtime.types.workspace.creation.DevelopmentWorkspaceCreator");
  application.importType("com.cordys.cws.runtime.types.workspace.DevelopmentWorkspace");

  var systemDocumentPlant = getCWSSystemEnvironment().documentPlant()
  var workspaceCreator = systemDocumentPlant.getDocumentManagerByTypeName( DevelopmentWorkspaceCreator.documentType ).newDocument();
  var newWorkspace = systemDocumentPlant.getDocumentManagerByTypeName( DevelopmentWorkspace.documentType ).newDocument();
  workspaceCreator.name(workspaceCreator.documentID());
  workspaceCreator.workspace(newWorkspace);
  workspaceCreator.makeTransient();

  newWorkspace.name(name);
  newWorkspace.description(name);

  newWorkspace.makePersistent();

  __createWorkspaceSynchrone(workspaceCreator);
  newWorkspace.refresh();

  var env = __getCWSEnvironmentFactory__().getEnvironmentByWorkspaceID(newWorkspace.documentID());
  return env;
}

function __createWorkspaceSynchrone( workspaceCreator )
{
  //create it directly (not async)
  application.importType("com.cordys.cws.umf.common.StudioUMFXDSJavaCall");
  var l_call = new StudioUMFXDSJavaCall(workspaceCreator, null, "createWorkspace", "http://schemas.cordys.com/cws/runtime/types/workspace/creation/DevelopmentWorkspaceCreator/1.0", false, true, null, null, false, null, null);
  l_call.execute();
}
            
function removeWorkspace(name)
{
  application.importType("com.cordys.cws.umf.common.util.StudioUMFSet");
  application.importType("com.cordys.cws.runtime.types.workspace.DevelopmentWorkspace");
  var workspaceToRemove = getEnvironmentByWorkspaceName(name).workspace();
  var set = new StudioUMFSet();
  set.add(workspaceToRemove);
  
  var systemEnvironment = getCWSSystemEnvironment();
  systemEnvironment.handleWorkspaceRemove( workspaceToRemove );
  var documentPlant = systemEnvironment.documentPlant();
  
  //delete it directly (not async)
  var l_call = new StudioUMFXDSJavaCall(DevelopmentWorkspace, documentPlant, "removeFromRepository", "http://schemas.cordys.com/cws/runtime/types/workspace/DevelopmentWorkspace/1.0", true, true, null, null, false, null, null);
  l_call.addParameter("object","workspaces",set,true);
}
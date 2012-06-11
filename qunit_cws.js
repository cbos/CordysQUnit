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
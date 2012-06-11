application.importType("com.cordys.cws.umf.CWSEnvironmentFactory");
application.importType("com.cordys.cws.umf.common.Definition");
application.importType("com.cordys.cws.umf.common.Framework");
application.importType( "com.cordys.cws.runtime.types.workspace.Workspace" );

test("QUnit - CWS initialization", function(){

  var environmentFactory = CWSEnvironmentFactory.getInstance();
  environmentFactory._useParentApplication( CordysRoot.application );
  environmentFactory._setWorkingInBUUI();

  var organizationalContext = environmentFactory._getOrganizationalContext( application.organization );
  environment = organizationalContext.getSystemEnvironment();
  ok(true, "CWS Initialized");
});


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
  return CWSEnvironmentFactory.getInstance().getEnvironmentByWorkspaceName(workspaceName, targetOrganization);
}
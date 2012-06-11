 test("QUnit - CWS initialization", function(){
  application.importType("com.cordys.cws.umf.CWSEnvironmentFactory");
  application.importType("com.cordys.cws.umf.common.Definition");
  application.importType("com.cordys.cws.umf.common.Framework");
  application.importType( "com.cordys.cws.runtime.types.workspace.Workspace" );

  ok(true, "Imports done");

  var environmentFactory = CWSEnvironmentFactory.getInstance();
  ok(true, "EnvironmentFactory created");
  environmentFactory._useParentApplication( CordysRoot.application );
  environmentFactory._setWorkingInBUUI();

  ok(true, "Ask for system environment");
  var organizationalContext = environmentFactory._getOrganizationalContext( application.organization );
  environment = organizationalContext.getSystemEnvironment();
  ok(true, "System environment ready");
});
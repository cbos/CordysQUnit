test("QUnit - Cordys initialization", function() {
  if(CordysRoot)
  {
    ok(CordysRoot.system != null, "Check for CordysRoot.system");
    ok(CordysRoot.system.framework != null, "Check for CordysRoot.system.framework");
    ok(CordysRoot.application != null, "CordysRoot.application");
    
    if(CordysRoot != null && CordysRoot.system != null && CordysRoot.system.framework != null)
    {
    	CordysRoot.system.framework.attachApplicationLibrary(window.document.documentElement);
    }
    else
    {
    	ok(false, "Not able to initialize Cordys");
    	return;
    }
   
    CordysRoot.CordysRootScreenX=1;
    CordysRoot.CordysRootScreenY=1
    ok(true, "UIUnit callibaration done, required for running it as UIUnit") 
    
    ok(true, "QUnit for Cordys initialized, CordysRoot is available");
     
  }
  else
  {
    ok(false, "No CordysRoot found");
  }
});

QUnit.done = function( result )
{
  CordysRoot.qunit_result = result;
}
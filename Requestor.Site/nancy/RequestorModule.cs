namespace Requestor.Site.nancy
{
    using Nancy;
    using System;

    public class RequestorModule : NancyModule
    {
        public RequestorModule()
        {
            Get["/"] = _ => { return View["views/index.sshtml"]; };
            Get["/requestor"] = _ => { return View["views/requestor/index.sshtml"]; };
            Get["/requestor/settings"] = _ => { return View["views/requestor/settings.sshtml"]; };
            Get["/requestor/import"] = _ => { return View["views/requestor/import.sshtml"]; };
            Get["/requestor/export"] = _ => { return View["views/requestor/export.sshtml"]; };
        }

    }
}
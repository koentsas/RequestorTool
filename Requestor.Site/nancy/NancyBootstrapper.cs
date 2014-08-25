namespace Requestor.Site.nancy
{
    using Nancy;
    using Nancy.Conventions;
    using Nancy.Json;
    using System;

    public class NancyBootstrapper : DefaultNancyBootstrapper
    {
        protected override void ConfigureConventions(NancyConventions nancyConventions)
        {
            JsonSettings.MaxJsonLength = Int32.MaxValue;

            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("css", @"css"));
            nancyConventions.StaticContentsConventions.Add(StaticContentConventionBuilder.AddDirectory("js", @"js"));
            base.ConfigureConventions(nancyConventions);
        }
    }
}
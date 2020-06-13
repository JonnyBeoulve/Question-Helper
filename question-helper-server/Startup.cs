using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbUp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using QuestionHelper.Authorization;
using QuestionHelper.Data;
using QuestionHelper.Hubs;

namespace QuestionHelper {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices (IServiceCollection services) {
            var connectionString = Configuration.GetConnectionString ("DefaultConnection");
            EnsureDatabase.For.SqlDatabase (connectionString);
            var upgrader = DeployChanges.To
                .SqlDatabase (connectionString, null)
                .WithScriptsEmbeddedInAssembly (System.Reflection.Assembly.GetExecutingAssembly ())
                .WithTransaction ()
                .LogToConsole ()
                .Build ();

            if (upgrader.IsUpgradeRequired ()) {
                upgrader.PerformUpgrade ();
            }

            services.AddControllers ();

            services.AddScoped<IDataRepository, DataRepository> ();

            services.AddCors (options => options.AddPolicy ("CorsPolicy",
                builder => builder.AllowAnyMethod ().AllowAnyHeader ().WithOrigins ("http://localhost:3000").AllowCredentials ()));

            services.AddSignalR ();

            services.AddMemoryCache ();
            services.AddSingleton<IQuestionCache, QuestionCache> ();

            services.AddAuthentication (options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer (options => {
                options.Authority = Configuration["Auth0:Authority"];
                options.Audience = Configuration["Auth0:Audience"];
            });

            services.AddHttpClient ();

            services.AddAuthorization (options =>
                options.AddPolicy ("MustBeQuestionAuthor", policy => policy.Requirements.Add (new MustBeQuestionAuthorRequirement ())));
            services.AddScoped<IAuthorizationHandler, MustBeQuestionAuthorHandler> ();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor> ();
        }

        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseCors ("CorsPolicy");

            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseHttpsRedirection ();
            }

            app.UseRouting ();
            app.UseAuthentication ();
            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();
                endpoints.MapHub<QuestionsHub> ("/questionshub");
            });
        }
    }
}
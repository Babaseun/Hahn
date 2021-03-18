using FluentValidation.AspNetCore;
using Hahn.ApplicatonProcess.February2021.Data;
using Hahn.ApplicatonProcess.February2021.Data.Repositories;
using Hahn.ApplicatonProcess.February2021.Domain.IRepository;
using Hahn.ApplicatonProcess.February2021.Domain.Validators;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Converters;
using Serilog;
using Swashbuckle.AspNetCore.Filters;
using System;
using System.IO;
using System.Reflection;

namespace Hahn.ApplicatonProcess.February2021.Web
{
	public class Startup
	 {
		  public Startup(IConfiguration configuration)
		  {
				Configuration = configuration;
		  }

		  public IConfiguration Configuration { get; }

		  // This method gets called by the runtime. Use this method to add services to the container.
		  public void ConfigureServices(IServiceCollection services)
		  {
				  services.AddCors();
			services.AddControllers()
						  .AddFluentValidation(config => config.RegisterValidatorsFromAssemblyContaining<CreateAssetValidator>())
					 .AddNewtonsoftJson(options =>
					 options.SerializerSettings.Converters.Add(new StringEnumConverter()));
				services.AddSwaggerGenNewtonsoftSupport();

				services.AddDbContext<AssetContext>(options => options.UseInMemoryDatabase("Asset.db"));
				services.AddScoped<IAssetRepository, AssetRepository>();

				services.AddSwaggerGen(c =>
				{
					 c.SwaggerDoc("v1", new OpenApiInfo { Title = "Hahn.ApplicatonProcess.February2021.Web", Version = "v1" });
							c.ExampleFilters();

							var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
							var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
							c.IncludeXmlComments(xmlPath);

				});
				services.AddSwaggerGenNewtonsoftSupport();
                services.AddSwaggerExamplesFromAssemblyOf<Startup>();
		}
		  // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		  public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		  {
				if (env.IsDevelopment())
				{
					 app.UseDeveloperExceptionPage();
					 app.UseSwagger();
					 app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hahn.ApplicatonProcess.February2021.Web v1"));
					 app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
				}

				app.UseHttpsRedirection();

				app.UseRouting();

                app.UseSerilogRequestLogging();

			app.UseAuthorization();

				app.UseEndpoints(endpoints =>
				{
					 endpoints.MapControllers();
				});
		  }
	 }
}

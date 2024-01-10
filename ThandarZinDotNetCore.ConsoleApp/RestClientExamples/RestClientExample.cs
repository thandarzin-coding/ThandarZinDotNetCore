using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThandarZinDotNetCore.ConsoleApp.Models;

namespace ThandarZinDotNetCore.ConsoleApp.RestClientExamples
{
    public class RestClientExample
    {
        public async Task Run()
        {
            //await Read();
            //await Edit(1002);
            await Edit(100);
            //await Create("Test Title", "Test Author", "Test Content");
            await Update(39, "Testing1", "Testing2", "Testing3");
            //await Delete(11);
        }

        private async Task Read()
        {
            RestClient client = new RestClient();
            RestRequest request = new RestRequest("https://localhost:7003/api/blog");
            var response = await client.GetAsync(request);
            if (response.IsSuccessStatusCode)
            {
                List<BlogDataModel> lst = JsonConvert.DeserializeObject<List<BlogDataModel>>(response.Content!)!;
                Console.WriteLine(lst);
                Console.WriteLine(JsonConvert.SerializeObject(lst, Formatting.Indented));
            }
            else
            {
                Console.WriteLine(response.Content);
            }
        }

        private async Task Edit(int id)
        {
            RestClient client = new RestClient();
            RestRequest request = new RestRequest($"https://localhost:7003/api/blog/{id}");
            var response = await client.GetAsync(request);
            if (response.IsSuccessStatusCode)
            {
                BlogDataModel item = JsonConvert.DeserializeObject<BlogDataModel>(response.Content!)!;
                Console.WriteLine(item);
                Console.WriteLine(JsonConvert.SerializeObject(item, Formatting.Indented));
            }
            else
            {
                Console.WriteLine(response.Content);
            }
        }

        private async Task Create(string title, string author, string content)
        {
            BlogDataModel blog = new BlogDataModel
            {
                Blog_Title = title,
                Blog_Author = author,
                Blog_Content = content
            };

            RestClient client = new RestClient();
            RestRequest request = new RestRequest("https://localhost:7003/api/blog");
            request.AddJsonBody(blog);
            var response = await client.PostAsync(request);
            if (response.IsSuccessStatusCode)
            {
                string message = response.Content!;
                Console.WriteLine(message);
            }
            else
            {
                Console.WriteLine(response.Content);
            }
        }

        private async Task Update(int id, string title, string author, string content)
        {
            BlogDataModel blog = new BlogDataModel
            {
                Blog_Id = id,
                Blog_Title = title,
                Blog_Author = author,
                Blog_Content = content
            };
            RestClient client = new RestClient();
            RestRequest request = new RestRequest($"https://localhost:7003/api/blog/{id}");
            request.AddJsonBody(blog);
            var response = await client.PutAsync(request);
            if (response.IsSuccessStatusCode)
            {
                string message = response.Content!;
                Console.WriteLine(message);
            }
            else
            {
                Console.WriteLine(response.Content);
            }
        }

        private async Task Delete(int id)
        {
            RestClient client = new RestClient();
            RestRequest request = new RestRequest($"https://localhost:7003/api/blog/{id}");
            var response = await client.DeleteAsync(request);
            if (response.IsSuccessStatusCode)
            {
                string message = response.Content!;
                Console.WriteLine(message);
            }
            else
            {
                Console.WriteLine(response.Content);
            }
        }
    }
}

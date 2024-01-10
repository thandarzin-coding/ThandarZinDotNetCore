using Newtonsoft.Json;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ThandarZinDotNetCore.ConsoleApp.Models;

namespace ThandarZinDotNetCore.ConsoleApp.RefitExamples
{
    internal class RefitExample
    {

        IBlogApi blogApi = RestService.For<IBlogApi>("https://localhost:7199");

        public async Task Run()
        {
            //await Read();
            //await Edit(22);
            // await Edit(20);
            //await Create("one", "two", "three");
            //await Update(80, "xyz", "yui", "abc");
            await Delete(80);
        }

        private async Task Read()
        {
            var lst = await blogApi.GetBlogs();

            Console.WriteLine(lst);
            Console.WriteLine(JsonConvert.SerializeObject(lst, Formatting.Indented));
        }

        private async Task Edit(int id)
        {
            var item = await blogApi.GetBlog(id);
            if (item is null)
            {
                Console.WriteLine("No Data Found");
            }

            Console.WriteLine(item);
            Console.WriteLine(JsonConvert.SerializeObject(item, Formatting.Indented));
        }

        private async Task Create(string title, string author, string content)
        {
            BlogDataModel blog = new BlogDataModel
            {
                Blog_Title = title,
                Blog_Author = author,
                Blog_Content = content
            };
            var message = await blogApi.CreateBlog(blog);
            Console.WriteLine(message);
        }

        private async Task Update(int id, string title, string author, string content)
        {
            var item = await blogApi.GetBlog(id);
            if (item is null)
            {
                Console.WriteLine("No Data Found");
            }

            BlogDataModel blog = new BlogDataModel
            {
                Blog_Id = id,
                Blog_Title = title,
                Blog_Author = author,
                Blog_Content = content
            };
            var message = await blogApi.UpdateBlog(id, blog);
            Console.WriteLine(message);
        }

        private async Task Delete(int id)
        {
            var item = await blogApi.GetBlog(id);
            if (item is null)
            {
                Console.WriteLine("No Data Found");
            }
            var message = await blogApi.DeleteBlog(id);
            Console.WriteLine(message);

        }
    }
}

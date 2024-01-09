using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ThandarZinDotNetCore.ConsoleApp.EfCoreExamples;
using ThandarZinDotNetCore.ConsoleApp.Models;

namespace ThandarZinDotNetCore.RestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly AppDbContext _dbContext = new AppDbContext();

        [HttpGet]
        public IActionResult GetBlogs()
        {
            var lst = _dbContext.Blogs.ToList();
            return Ok(lst);
        }

        [HttpGet("{id}")]
        public IActionResult GetBlog(int id)
        {
            var item = _dbContext.Blogs.FirstOrDefault(x => x.Blog_Id == id);
            if(item is null)
            {
                return NotFound("No Data Found");
            }
            return Ok(item);
        }

        [HttpPost]
        public IActionResult CreateBlogs (BlogDataModel blogDataModel)
        {
            _dbContext.Blogs.Add(blogDataModel);
            int result = _dbContext.SaveChanges();
            string message = result > 0 ? "Saving Successfully" : "Save Faild";
            return Ok(message);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBlogs(int id, BlogDataModel blog)
        {
            var item = _dbContext.Blogs.FirstOrDefault(x => x.Blog_Id == id);
            if (item is null)
            {
                return NotFound("No Data Found");
            }

            if (string.IsNullOrEmpty(blog.Blog_Title))
            {
                return BadRequest("Blog Title is required");
            }

            if (string.IsNullOrEmpty(blog.Blog_Author))
            {
                return BadRequest("Blog Author is required");
            }

            if (string.IsNullOrEmpty(blog.Blog_Content))
            {
                return BadRequest("Blog_Content is required");
            }
            item.Blog_Content = blog.Blog_Content;
            item.Blog_Author = blog.Blog_Author;
            item.Blog_Title = blog.Blog_Title;

            int result = _dbContext.SaveChanges();
            string message = result > 0 ? "Updated Successfully" : "Save Failed";
            return Ok(message);
        }

        [HttpPatch("{id}")]
        public IActionResult PatchBlogs(int id, BlogDataModel blog)
        {
            var item = _dbContext.Blogs.FirstOrDefault(x => x.Blog_Id == id);
            if (item is null)
            {
                return NotFound("No data found.");
            }

            if (!string.IsNullOrEmpty(blog.Blog_Title))
            {
                item.Blog_Title = blog.Blog_Title;
            }
            if (!string.IsNullOrEmpty(blog.Blog_Author))
            {
                item.Blog_Author = blog.Blog_Author;
            }
            if (!string.IsNullOrEmpty(blog.Blog_Content))
            {
                item.Blog_Content = blog.Blog_Content;
            }

            int result = _dbContext.SaveChanges();
            string message = result > 0 ? "Updating Successful." : "Updating Failed.";

            return Ok(message);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBlog(int id)
        {
            var item = _dbContext.Blogs.FirstOrDefault(x => x.Blog_Id == id);
            if(item is null)
            {
                return NotFound("No data found.");
                
            }
            _dbContext.Blogs.Remove(item);
            int result = _dbContext.SaveChanges();
            string message = result > 0 ? "Deleting Successfully" : "Delete Faild";
            return Ok(message);

        }


    }
}

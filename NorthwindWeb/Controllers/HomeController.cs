using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Globalization;

namespace NorthwindWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly NorthwindContext northwindContext;

        public HomeController(NorthwindContext northwindContext)
        {
            this.northwindContext = northwindContext;
        }

        public async Task<IActionResult> Index()
        {
            var ordermodel = await northwindContext.Orders.Include(o => o.Customer).Include(o => o.Employee).Include(o => o.ShipViaNavigation).ToListAsync();

            #region month chart
            var orders = await northwindContext.Orders
                .GroupBy(o => o.OrderDate.Value.Month)
                .Select(g => new { Month = g.Key, Count = g.Count() })
                .OrderBy(x => x.Month)
                .ToListAsync();

            ViewBag.OrderData = orders.Select(x => x.Count).ToArray();
            ViewBag.MonthLabels = orders.Select(x => CultureInfo.CurrentCulture.DateTimeFormat.GetAbbreviatedMonthName(x.Month)).ToArray();
            #endregion

            #region category pie chart 
            var categories = await northwindContext.Categories
            .Select(c => new { c.CategoryName, ProductCount = c.Products.Count })
            .OrderByDescending(x => x.ProductCount)
            .Take(5)
            .ToListAsync();

            ViewBag.CategoryLabels = categories.Select(x => x.CategoryName).ToArray();
            ViewBag.ProductCounts = categories.Select(x => x.ProductCount).ToArray();
            #endregion

            #region orderby year line chart
            var ordersByYear = northwindContext.Orders
                .GroupBy(o => o.OrderDate.Value.Year)
                .Select(g => new { Year = g.Key, OrderCount = g.Count() })
                .OrderBy(x => x.Year)
                .ToList();

            ViewBag.Years = ordersByYear.Select(x => x.Year);
            ViewBag.OrderCounts = ordersByYear.Select(x => x.OrderCount);
            #endregion

            #region order country
            var ordersByCountry = await northwindContext.Orders
                .GroupBy(o => o.ShipCountry)
                .Select(g => new { Country = g.Key, OrderCount = g.Count() })
                .OrderByDescending(x => x.OrderCount)
                .ToListAsync();

            ViewBag.Countries = ordersByCountry.Select(x => x.Country);
            ViewBag.OrderCounts2 = ordersByCountry.Select(x => x.OrderCount);
            #endregion

            var customers = await northwindContext.Customers.ToListAsync();
            ViewBag.CustomerList = customers;
            return View(ordermodel);
        }


    }
}
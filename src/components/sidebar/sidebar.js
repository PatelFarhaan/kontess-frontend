import React from "react";
import SidebarData from "../blog/SidebarData";
import PopularPosts from "../blog/PopularPosts";
import SearchBar from "../search_bar/SearchBar";

const Sidebar = () => {

    let categoriesData = [
      {
        link: "#",
        name: "Web Design",
      },
      {
        link: "#",
        name: "Featured Blog",
      },
      {
        link: "#",
        name: "Photography Idea",
      },
      {
        link: "#",
        name: "Design Tutorials",
      },
      {
        link: "#",
        name: "Arts and Entertainment",
      },
    ];

    let tagsData = [
      {
        link: "#",
        name: "Adverstisment",
      },
      {
        link: "#",
        name: "Blog",
      },
      {
        link: "#",
        name: "Fashion",
      },
      {
        link: "#",
        name: "Inspiration",
      },
      {
        link: "#",
        name: "Smart quotes",
      }
    ];

    let archiveData = [
      {
        link: "#",
        name: "june 2020",
      },
      // {
      //   link: "#",
      //   name: "January 2015",
      // },
      // {
      //   link: "#",
      //   name: "February 2015",
      // },
      // {
      //   link: "#",
      //   name: "March 2015",
      // },
      // {
      //   link: "#",
      //   name: "April 2015",
      // },

      {/*  YOU CAN ADD MORE ARCHIVE DATA HERE*/}
    ];

    return (
      <div className="blog_right_sidebar">
        <SearchBar></SearchBar>
        <div className="blog_right_col">
          <h4>Categories</h4>
          <SidebarData className="catagories_list" data={categoriesData} />
        </div>
        <div className="blog_right_col">
          <h4>Popular Posts</h4>
          <PopularPosts></PopularPosts>
        </div>
        <div className="blog_right_col">
          <h4>Tags Cloud</h4>
          <SidebarData className="tags" data={tagsData} />
        </div>
        <div class="blog_right_col">
          <h4>Archive</h4>
          <SidebarData className="catagories_list" data={archiveData} />
        </div>
      </div>
    );
}

export default Sidebar;
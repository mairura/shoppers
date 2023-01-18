import React from 'react'
import img1 from "../images/profile1.jpg"
import img2 from "../images/profile2.avif"
import img3 from "../images/profile3.jpg"
import "./form.css"

const Blog = () => {
  return (
    <div className="blog_post" >
      <h4>Daily Updates</h4>
      <div className="blog_post_row">
        <div className="col_blog">
          <div className="profile">
            <img src={img1} alt="profile" />
          </div>
          <p>I got the best services from Shoppers Mall. They are incredibly reliable
            and one can count on them. I got some books from them on my doorstep.
            I am a busy woman and leaving my job to go and shop for books took me a 
            while as I had to postpone that each day. Now the teachers cant trouble me anymore.
            This is incredible! 👍 
            <br />
            <i>Updated on 26th Sep, 2022</i>
          </p>
          
        </div>
        <div className="col_blog">
          <div className="profile">
            <img src={img2} alt="profile" />
          </div>
          <p>I needed new sun glasses and it took me a while to get what i really desired until
            a friend of mine recommended Shoppers. I had to try that site and indeed am happy
            I got good friends who really know what I want. This is a great site for everyone.
            <br />
            <i>Updated on 24th Sep, 2022</i>
          </p>
          
        </div>
        <div className="col_blog">
          <div className="profile">
            <img src={img3} alt="profile" />
          </div>
          <p>I had trouble with shopping experience but since I found out about Shoppers, not only
            have I been there several times but also my husband is having trouble with my late desire for shopping.
            I like good services and generally services. 
            If I liked them then I think no one can't! 👐 
            <br />
            <i>Updated on 6th July, 2022</i>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Blog
<template>
    <div class="about-page">
      <div class="container">
        <h1 class="title">About Us</h1>
        <section class="developer-info">
          <h2 class="subtitle">Meet the Developers</h2>
          <div class="developer">
            <h3>Idan</h3>
            <p>
              Idan is a passionate developer with expertise in front-end technologies, particularly in Vue.js. He has a keen eye for design and user experience, ensuring that the website is not only functional but also visually appealing.
            </p>
          </div>
          <div class="developer">
            <h3>David</h3>
            <p>
              David specializes in back-end development, making sure the website's functionality is robust and reliable. He is experienced in working with various databases and server-side technologies to provide a seamless user experience.
            </p>
          </div>
        </section>
        <section class="website-info">
          <h2 class="subtitle">About the Website</h2>
          <p>
            This website is designed to provide users with an easy and efficient way to discover and create new recipes. Whether you are looking for quick meal ideas or elaborate dishes, our website has something for everyone. With features like search filters, recipe creation, and user accounts, we aim to make your cooking experience enjoyable and hassle-free.
          </p>
        </section>
        <section class="links">
          <h2 class="subtitle">Useful Links</h2>
          <ul>
            <li><a href="https://wed-2023.github.io/213633332/" target="_blank">Idan's Project Repository</a></li>
            <li><a href="https://wed-2023.github.io/210020053/" target="_blank">David's Project Repository</a></li>
        </ul>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AboutPage",
  };
  </script>
  
  <style scoped>
  .about-page {
    background-color: #f9f9f9;
    padding: 40px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: 40px auto 0 auto; /* Add top margin here */
    
  }
  
  .container {
    text-align: center;
  }
  
  .title {
    font-size: 2.5em;
    color: #333;
    margin-bottom: 20px;
  }
  
  .subtitle {
    font-size: 1.8em;
    color: #555;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  
  .developer-info,
  .website-info,
  .links {
    margin-bottom: 30px;
  }
  
  .developer {
    margin-bottom: 20px;
  }
  
  .developer h3 {
    font-size: 1.5em;
    color: #444;
  }
  
  .developer p {
    font-size: 1em;
    color: #666;
  }
  
  .website-info p {
    font-size: 1.2em;
    color: #666;
  }
  
  .links ul {
    list-style: none;
    padding: 0;
  }
  
  .links li {
    margin-bottom: 10px;
  }
  
  .links a {
    color: #007bff;
    text-decoration: none;
  }
  
  .links a:hover {
    text-decoration: underline;
  }
  </style>
  
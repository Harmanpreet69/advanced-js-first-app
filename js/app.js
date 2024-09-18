(function () {
  const loadHeader = () => {
    /* use jquery to read the HTML from the shared header file
    then render this HTML content to the <header> element */
    $.get("./views/shared/header.html", (htmlData) => {
      $("header").html(htmlData);

      // after navbar loads, add JS event handlers to each link to load the correct page
      $(".navbar-brand, .nav-link").on("click", (event) => {
        // cancel any default behaviour
        event.preventDefault();

        // change page title based on the id of the current link clicked
        document.title = $(event.currentTarget).prop("id");

        // get the contents of the selected page
        LoadContent();
      });
    });
  };

  const LoadContent = () => {
    // get name of HTML file to load from document title
    let currentPage = document.title;
    $.get(`./views/${currentPage}.html`, (htmlData) => {
      $("main").html(htmlData);

      // use browser's History API to track the sequence of pages
      history.pushState({}, "", `/${document.title}`);
    });
  };

  let start = () => {
    console.log("App started");

    // Load Header, Footer and Content
    loadHeader();
    loadFooter();

    getContacts((data) => {
      const list = document.querySelector(".list-group");

      data.forEach((contact) => {
        const a = document.createElement("a");
        const li = document.createElement("li");

        li.className = "list-group-item";
        a.innerHTML = contact.name;

        a.href = `mailto:${contact.email}`;
        li.append(a);

        list.appendChild(li);
      });
    });
  };
  window.addEventListener("load", start);
})();

let updateCounter = (() => {
  let counter = 0;

  return () => {
    counter++;
    $("#counter").html(counter);
  };
})();

const getContacts = (callback) =>
  $.get("/data/contacts.json", (data) => callback(data));

const loadFooter = () => {
  $.get("./views/shared/footer.html", (htmlData) => {
    $("footer").html(htmlData);
  });
};

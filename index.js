const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
 
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
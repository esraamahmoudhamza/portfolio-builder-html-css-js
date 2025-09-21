// Load data from sessionStorage
const data = JSON.parse(sessionStorage.getItem('portfolioData')) || {};
const portfolioDiv = document.getElementById('portfolio');

if(data && Object.keys(data).length) {
  portfolioDiv.className = `portfolio ${data.template}`;
  portfolioDiv.innerHTML = `
    <div class="profile-image-frame">
      <img src="${data.imageSrc}" alt="Profile">
    </div>
    <h1>${data.name}</h1>
    <p>${data.bio}</p>

    <h3>Skills</h3>
    <ul>${data.skills.map(s => `<li>${s}</li>`).join('')}</ul>

    <h3>Projects</h3>
    <ul>${data.projects.map(p => `<li>${p}</li>`).join('')}</ul>

    <h3>Contact</h3>
    <p>${data.email}</p>
  `;

  // Apply theme color
  document.body.style.color = data.themeColor;
  portfolioDiv.querySelectorAll('li').forEach(li => li.style.background = `${hexToRGBA(data.themeColor,0.2)}`);
  document.getElementById('downloadBtn').style.background = data.themeColor;
}

// Convert hex to RGBA
function hexToRGBA(hex, alpha){
  let r=0,g=0,b=0;
  if(hex.length==7){
    r=parseInt(hex[1]+hex[2],16);
    g=parseInt(hex[3]+hex[4],16);
    b=parseInt(hex[5]+hex[6],16);
  }
  return `rgba(${r},${g},${b},${alpha})`;
}

// Download HTML
document.getElementById('downloadBtn').addEventListener('click',()=>{
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.name} Portfolio</title>
<style>
  body{font-family:'Roboto',sans-serif;background:#111;color:${data.themeColor};margin:0;padding:20px;text-align:center;}
  .profile-image-frame{width:150px;height:150px;margin:0 auto 15px;border-radius:50%;overflow:hidden;border:3px solid ${data.themeColor};}
  .profile-image-frame img{width:100%;height:100%;object-fit:cover;}
  ul{list-style:none;padding:0;}
  li{display:inline-block;background:rgba(0,255,255,0.2);margin:5px;padding:8px 12px;border-radius:8px;}
  .portfolio.template1{display:flex;flex-direction:column;align-items:center;gap:10px;}
  .portfolio.template2{display:grid;grid-template-columns:1fr 2fr;gap:20px;align-items:start;text-align:left;}
  .portfolio.template3{display:flex;flex-direction:row-reverse;gap:30px;align-items:flex-start;text-align:left;}
</style>
</head>
<body>
<div class="portfolio ${data.template}">
  <div class="profile-image-frame">
    <img src="${data.imageSrc}" alt="Profile">
  </div>
  <h1>${data.name}</h1>
  <p>${data.bio}</p>
  <h3>Skills</h3>
  <ul>${data.skills.map(s=>`<li>${s}</li>`).join('')}</ul>
  <h3>Projects</h3>
  <ul>${data.projects.map(p=>`<li>${p}</li>`).join('')}</ul>
  <h3>Contact</h3>
  <p>${data.email}</p>
</div>
</body>
</html>
  `;
  const blob = new Blob([htmlContent],{type:'text/html'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${data.name.replace(/\s/g,'_')}_Portfolio.html`;
  link.click();
});

var version = "other"
browserName = navigator.appName;   
browserVer = parseInt(navigator.appVersion);
if (browserName == "Netscape" && browserVer >= 3) version = "n3";
else if (browserName == "Netscape" && browserVer < 3) version = "n2";
else if (browserName == "Microsoft Internet Explorer" && browserVer >= 4) version = "e4";
else if (browserName == "Microsoft Internet Explorer" && browserVer < 4) version = "e3";

function isok(theform)
{
if (theform.联系人.value=="")
  {
    alert("请填写联系人，以便我们能更好地为您服务！");
    theform.txtUserName.focus();
    return (false);
  }


if (theform.联系电话.value=="")
  {
    alert("请填写联系电话，以便我们能更好地为您服务！");
    theform.txtUserTel.focus();
    return (false);
  }

if (theform.联系地址.value=="")
  {
    alert("请填写联系地址，以便我们能更好地为您服务！");
    theform.txtUserAdd.focus();
    return (false);
  }

if (theform.内容.value=="")
  {
    alert("请填写内容，以便我们能更好地为您服务！");
    theform.txtShow.focus();
    return (false);
  }

if(theform.邮编.value.length!=0&&(isNaN(parseInt(theform.邮编.value))==true||theform.邮编.value%1!=0))
 { 
   alert("邮政编码必须是数字");
   theform.邮编.focus();
   theform.邮编.select();
   return (false);
 }

return (true);
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function change(obj) {
  if(obj.selectedIndex == 0) { return false; }
  urlhtml=obj.options[obj.selectedIndex].value;
  window.open(urlhtml,"homeWin");
  obj.selectedIndex=0;
  return true;
  }
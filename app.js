// const weatherApi=
// {
//   key:"4f6ccecc785963c37f7b1521fc8bf6e6",
//   baseURL:"https://api.openweathermap.org/data/2.5/"
// }

// const searchBox=document.querySelector('.searchinput');
// searchBox.addEventListener('keypress',setQuery)

// function setQuery(event)
// {
//   if (event.keyCode==13) 
//  {
//   //  getResult(searchBox.value)
//    console.log(searchBox.value);
    
//   }
// }

const express=require('express');
const app=express();
const path=require('path')

const ejs=require('ejs');

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public')))
app.use('/public/css',express.static(path.join(__dirname,'public/css')))
app.use('/public/js',express.static(path.join(__dirname,'public/js')))
app.use('/public/images',express.static(path.join(__dirname,'public/images')))
app.use('/public/svg',express.static(path.join(__dirname,'public/svg')))

app.get('/',(req,res,next)=>
{
   res.render('weather')
})



const PORT =process.env.PORT || 4000
app.listen(PORT,()=>
{
  console.log(`server is starting at ${PORT}`);
})

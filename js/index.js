const handleCategory = async () =>{
    const response = await fetch(` https://openapi.programming-hero.com/api/news/categories`)
    const data = await response.json();
    const dataAll = data.data.news_category;
    // console.log(dataAll);

    const tabContainer = document.getElementById('tab-container');
    dataAll.slice(0,3).forEach((category)=>{
        // console.log(category);
        const div = document.createElement('div');
        div.innerHTML= `
        <a onclick ="handleLoadNews('${category.category_id}')" class="tab text-2xl">${category.category_name}</a>
        `
        tabContainer.appendChild(div);
    })
};
const handleLoadNews=async(categoryId)=>{
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await response.json()
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML= ""
    const idData = data.data
    console.log(idData);
    idData.forEach((news)=>{
        const div = document.createElement('div')
        div.innerHTML =`
        <div class="card bg-base-100 shadow-xl">
                    <figure><img class="p-8" src="${news.image_url}" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">
                       ${news.title.slice(0,30)}
                        <div class="badge badge-secondary p-5">${news.rating?.badge}</div>
                      </h2>
                      <p>${news.details.slice(0,50)}</p>
                      <h2>Total views:${news.total_view? news.total_view:"No views"}</h2>
                      <div class="card-footer flex justify-between mt-8">
                        <div class="flex">
                          <div>
                            <div class="avater online">
                              <div class="w-14  ">
                                <img class="rounded-full" src="${news.author?.img}" alt="">
                              </div>
                            </div>
                          </div>
                        </div> 
                        <div>
                          <h1>${news.author?.name}</h1>
                          <small>${news.author?.published_date}</small>
                        </div>
                      </div>
                      <div class="card-details-btn">
                        <button onclick ="handleModal('${news._id}')" class="inline-block cursor-pointer rounded-md bg-slate-600 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-out hover:bg-slate-700">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
        `
        cardContainer.appendChild(div)
    })
    

}

const handleModal=async(newsId)=>{
    const response = await fetch(` https://openapi.programming-hero.com/api/news/${newsId}`)
    const data = await response.json()
    const dataDetails = data.data[0]
    console.log(dataDetails);
    

    const modalContainer = document.getElementById('modal-container') 
   const div = document.createElement('div')
   div.innerHTML= `
   <dialog id="my_modal_2" class="modal">
     <form method="dialog" class="modal-box">
       <h3 class="font-bold text-lg">${dataDetails.title}</h3>
       <p class="py-4">${dataDetails.total_view}</p>
     </form>
     <form method="dialog" class="modal-backdrop">
       <button>close</button>
     </form>
   </dialog>
   `
   modalContainer.appendChild(div)
   const modal = document.getElementById('my_modal_2')
   modal.showModal()
}



handleCategory()
handleLoadNews("01")
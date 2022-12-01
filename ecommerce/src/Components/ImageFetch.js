import React, { useState } from 'react';
import './ImageFetch.css'
import axios from 'axios';


function ImageFetch() {
    const [images, setImages] = useState()
    const[searchName, setSearchName] = useState("")
    const [showBookmarkbtn, setShowBookmarkbtn] = useState(false)
    const[bookmarkImages, setBookmarkImages] = useState([]);
    const [showBkImages, setShowBkImages] = useState(false)

    const FetchImage = (e) => {
        e.preventDefault()
        console.log("I am fetching data")
        console.log(searchName)
        let url = "https://api.unsplash.com/search/photos?page=1&query="+searchName+"&client_id=KI7qHH6FdA82VaogXrAF5GznwIyQidJdIEbscg0CRIo&per_page=30"
        axios.get(url)
            .then((res) => {
                console.log(res)
                setImages(res.data.results)
            })
            // .then(()=>console.log(images))
            // .then(()=>console.log(images[0].user.profile_image.small))
            .catch((err)=>console.log(err))
            
    }
    const showBookmarkBtn = ()=>{
        setShowBookmarkbtn(true)
    }
    const notShowBookmarkbtn = ()=>{
        setShowBookmarkbtn(false)
    }
    const addImagesToBookmark = (url)=>{
        setBookmarkImages([...bookmarkImages,{src:url}])
        console.log(bookmarkImages)
    }
    const bookMarkList = ()=>{
        setShowBkImages(!showBkImages)
    }

    
    // 

    //KI7qHH6FdA82VaogXrAF5GznwIyQidJdIEbscg0CRIo
    //RFSEUgX2SrRWAC00pIH2GHSbwHjQ4eZsxFr-txKADnY
    //urn:ietf:wg:oauth:2.0:oob


  return (
    <div className='fetching'>
        <div className='header'>
        <h1>React Photo Search</h1>
        <button type="submit" className='bookmarkbtn' onClick={bookMarkList}>Bookmark</button>
        </div>

        <div className='serachImages'>
            <input type="search" 
            name="imageSearch" 
            id="imageSearch" 
            placeholder='   Search high resolution Images'
            value={searchName}
            onChange={(e)=>{setSearchName(e.target.value)}}/>
            <button type="submit" 
            className='searchbtn'
            onClick={(e)=>FetchImage(e)}>Search</button>
        </div>
          <div className='images'>
              {!showBkImages && images && images.map((image, index) => {
                  return <div key={index} className='bookmarkbtnshow'>
                      {showBookmarkbtn && <button className='bookbtn' onClick={() => addImagesToBookmark(image.urls.regular)}>Bk</button>}
                      <div>
                      {/* user.profile_image.large */}
                      <img
                          src={image.urls.regular}
                          alt="profileImage"
                          className='fetchedImage'
                          onMouseOver={showBookmarkBtn}
                        // onMouseLeave={notShowBookmarkbtn}
                      />
                      </div>
                      
                  </div>
              })}

              {showBkImages && bookmarkImages.map((image, index) => {
                  return <div key={index} className='bookmarkbtnshow'>
                      <img
                          src={image.src}
                          alt="profileImage"
                          className='fetchedImage'
                      />
                  </div>
              })
              }
          </div>

    </div>
  )
}

export default ImageFetch
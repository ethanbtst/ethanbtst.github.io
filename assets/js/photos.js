function switchPic(img){
    var big_pic = document.getElementById("pic-picked");
    var imgText = document.getElementById("caption");

    big_pic.src = img.src;

    var current = document.getElementsByClassName("active-desc")[0]
    var new_cur = document.getElementById(img.alt + "-desc")

    current.classList.remove("active-desc")
    current.classList.add("inactive-desc")

    new_cur.classList.remove("inactive-desc")
    new_cur.classList.add("active-desc")

}
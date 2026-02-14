export function showToast(message, type = 'success') {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.className = "show"; 
    toast.classList.add(type);

    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
        setTimeout(() => { toast.className = ""; }, 300);
    }, 3000);
}
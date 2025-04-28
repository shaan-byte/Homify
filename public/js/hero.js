document.addEventListener('DOMContentLoaded', () => {
  
    const getStartedBtn = document.getElementById('getStartedBtn');
    const heroScreen = document.getElementById('heroScreen');
    const contentScreen = document.getElementById('contentScreen');
    const body = document.body;

    if (getStartedBtn && heroScreen && contentScreen) {
        getStartedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            
            getStartedBtn.disabled = true;
            
            
            body.classList.add('transitioning');
            
            
            heroScreen.classList.add('slide-up');
            
           
            setTimeout(() => {
                contentScreen.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = '/listings';
                }, 300);
            }, 500);
  
            setTimeout(() => {
                body.classList.remove('transitioning');
                getStartedBtn.disabled = false;
            }, 1000);
        });
    }
}); 
document.addEventListener('DOMContentLoaded', () => {
    // الرابط الفعلي لـ Google Apps Script الذي قمنا بإنشائه
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxUCk5m-oBCtupiRU8j5dwpSEhhGrXpbc0e9ult2PofBPFy6b7aGPgWh3ayAajIzxyi/exec';
    
    const form = document.getElementById('internForm') || document.getElementById('clientForm');
    const loadingState = document.getElementById('loadingState');
    const successState = document.getElementById('successState');
    const submitBtn = document.getElementById('submitBtn');

    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // إخفاء النموذج وعرض حالة التحميل
        form.classList.add('hidden');
        loadingState.classList.remove('hidden');

        // جمع بيانات النموذج
        const formData = new FormData(form);

        // محاكاة الإرسال إذا لم يتم تحديد الرابط
        if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' || !scriptURL) {
            console.log("رابط سكربت جوجل غير موجود. هذه محاكاة للإرسال...");
            setTimeout(() => {
                showSuccess();
            }, 2000);
            return;
        }

        // الإرسال الفعلي لـ Google Apps Script مع تحويل البيانات لـ URLSearchParams
        fetch(scriptURL, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData) 
        })
            .then(response => {
                showSuccess();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
                
                // العودة للنموذج في حالة الخطأ
                loadingState.classList.add('hidden');
                form.classList.remove('hidden');
            });
    });

    function showSuccess() {
        loadingState.classList.add('hidden');
        successState.classList.remove('hidden');
        form.reset();

        // اختياري: إعادة إظهار النموذج بعد فترة
        setTimeout(() => {
            successState.classList.add('hidden');
            form.classList.remove('hidden');
        }, 5000); // العودة بعد 5 ثوانٍ
    }
});

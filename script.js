document.addEventListener('DOMContentLoaded', () => {
    // الرابط الفعلي لـ Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzzCiHskvbRhT4VNH68D3TYaKyiB2uJKcAlsGCvhH-L0gzxF1EaZDcPIzyFOM6cb9QC/exec';

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

        // تحويل بيانات النموذج إلى URL-encoded لضمان استلامها بشكل صحيح في e.parameter
        const formData = new FormData(form);
        const encodedData = new URLSearchParams(formData);

        fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodedData
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

        // إعادة إظهار النموذج بعد 5 ثوانٍ
        setTimeout(() => {
            successState.classList.add('hidden');
            form.classList.remove('hidden');
        }, 5000);
    }
});

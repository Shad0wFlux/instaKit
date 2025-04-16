// Main JavaScript file for InstaKitPro - Dark Theme

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة عناصر واجهة المستخدم
    initializeUI();
    
    // إضافة تأثيرات بصرية للعناصر
    addVisualEffects();
    
    // التحقق من حالة تسجيل الدخول
    checkLoginStatus();
});

// تهيئة عناصر واجهة المستخدم
function initializeUI() {
    // إضافة مستمعي الأحداث للنماذج
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const updateProfileForm = document.getElementById('updateProfileForm');
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', handleProfileUpdate);
    }
    
    const copyProfileForm = document.getElementById('copyProfileForm');
    if (copyProfileForm) {
        copyProfileForm.addEventListener('submit', handleProfileCopy);
    }
    
    // ملء حقول معرف الجلسة تلقائيًا إذا كانت موجودة
    const sessionIdInputs = document.querySelectorAll('input[name="session_id"]');
    if (sessionIdInputs.length > 0) {
        const sessionId = localStorage.getItem('instakit_session');
        if (sessionId) {
            sessionIdInputs.forEach(input => {
                input.value = sessionId;
            });
        }
    }
    
    // عرض اسم المستخدم في صفحة نتيجة نسخ الملف الشخصي
    const targetUsernameElement = document.getElementById('target-username');
    if (targetUsernameElement) {
        const targetUsername = localStorage.getItem('instakit_target_username');
        if (targetUsername) {
            targetUsernameElement.textContent = targetUsername;
        }
    }
    
    // عرض صورة الملف الشخصي في صفحات النتائج إذا كانت متاحة
    const profileImageElement = document.getElementById('profile-image');
    if (profileImageElement) {
        // استخدام صورة افتراضية من مجلد الصور
        profileImageElement.src = 'images/IMG_9338.JPG';
    }
}

// إضافة تأثيرات بصرية للعناصر
function addVisualEffects() {
    // إضافة تأثير توهج للأيقونات عند التحويم
    const icons = document.querySelectorAll('.icon-glow');
    icons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.textShadow = '0 0 15px rgba(0, 198, 255, 0.9), 0 0 30px rgba(0, 198, 255, 0.7)';
        });
        
        icon.addEventListener('mouseout', function() {
            this.style.textShadow = '0 0 10px rgba(0, 198, 255, 0.7)';
        });
    });
    
    // إضافة تأثير نبض للأزرار
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// التحقق من حالة تسجيل الدخول
function checkLoginStatus() {
    const sessionId = localStorage.getItem('instakit_session');
    const username = localStorage.getItem('instakit_username');
    
    // إذا كان المستخدم في صفحة نتيجة وليس لديه معرف جلسة، إعادة توجيهه
    const isResultPage = window.location.href.includes('result.html') || 
                         window.location.href.includes('updated.html') || 
                         window.location.href.includes('copied.html');
    
    if (isResultPage && !sessionId) {
        window.location.href = 'extract_session.html';
    }
}

// معالجة تسجيل الدخول واستخراج الجلسة
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        showAlert('danger', 'يرجى إدخال اسم المستخدم وكلمة المرور');
        return;
    }
    
    // إظهار مؤشر التحميل
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('loading-container').style.display = 'block';
    
    // استدعاء API لاستخراج الجلسة (محاكاة)
    setTimeout(function() {
        // في الإصدار الحقيقي، هنا سيتم استدعاء API للتحقق من بيانات الاعتماد واستخراج الجلسة
        // للعرض التوضيحي، نقوم بتوليد معرف جلسة عشوائي
        const sessionId = generateRandomSessionId();
        
        // تخزين معرف الجلسة في التخزين المحلي
        localStorage.setItem('instakit_session', sessionId);
        localStorage.setItem('instakit_username', username);
        
        // تخزين مسار الصورة الافتراضية
        localStorage.setItem('instakit_profile_image', 'images/IMG_9338.JPG');
        
        // توجيه المستخدم إلى صفحة النتيجة
        window.location.href = 'session_result.html';
    }, 2000);
}

// معالجة تحديث الملف الشخصي
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const sessionId = document.getElementById('session_id').value;
    const profilePic = document.getElementById('profile_pic').files[0];
    
    if (!sessionId) {
        showAlert('danger', 'يرجى إدخال معرف الجلسة');
        return;
    }
    
    if (!profilePic) {
        showAlert('danger', 'يرجى اختيار صورة للملف الشخصي');
        return;
    }
    
    // إظهار مؤشر التحميل
    document.getElementById('updateProfileForm').style.display = 'none';
    document.getElementById('loading-container').style.display = 'block';
    
    // استدعاء API لتحديث الملف الشخصي (محاكاة)
    setTimeout(function() {
        // في الإصدار الحقيقي، هنا سيتم استدعاء API لتحديث الملف الشخصي
        // للعرض التوضيحي، نقوم بتخزين حالة التحديث في التخزين المحلي
        localStorage.setItem('instakit_profile_updated', 'true');
        
        // تخزين مسار الصورة الجديدة (نستخدم صورة افتراضية من مجلد الصور)
        localStorage.setItem('instakit_profile_image', 'images/IMG_9339.JPG');
        
        // توجيه المستخدم إلى صفحة النتيجة
        window.location.href = 'profile_updated.html';
    }, 2000);
}

// معالجة نسخ الملف الشخصي
function handleProfileCopy(e) {
    e.preventDefault();
    
    const sessionId = document.getElementById('session_id').value;
    const targetUsername = document.getElementById('target_username').value;
    
    if (!sessionId) {
        showAlert('danger', 'يرجى إدخال معرف الجلسة');
        return;
    }
    
    if (!targetUsername) {
        showAlert('danger', 'يرجى إدخال اسم المستخدم المستهدف');
        return;
    }
    
    // إظهار مؤشر التحميل
    document.getElementById('copyProfileForm').style.display = 'none';
    document.getElementById('loading-container').style.display = 'block';
    
    // استدعاء API لنسخ الملف الشخصي (محاكاة)
    setTimeout(function() {
        // في الإصدار الحقيقي، هنا سيتم استدعاء API لنسخ الملف الشخصي
        // للعرض التوضيحي، نقوم بتخزين حالة النسخ في التخزين المحلي
        localStorage.setItem('instakit_profile_copied', 'true');
        localStorage.setItem('instakit_target_username', targetUsername);
        
        // تخزين مسار الصورة المنسوخة (نستخدم صورة افتراضية من مجلد الصور)
        localStorage.setItem('instakit_profile_image', 'images/IMG_9340.JPG');
        
        // توجيه المستخدم إلى صفحة النتيجة
        window.location.href = 'profile_copied.html';
    }, 2000);
}

// دالة لعرض تنبيه
function showAlert(type, message) {
    const alertContainer = document.getElementById('alert-container');
    if (alertContainer) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
    }
}

// دالة لنسخ النص إلى الحافظة
function copySessionId() {
    var sessionIdInput = document.getElementById("sessionId");
    sessionIdInput.select();
    sessionIdInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    
    // إظهار إشعار النسخ
    var button = document.querySelector(".btn-primary");
    var originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
    button.classList.remove("btn-primary");
    button.classList.add("btn-success");
    
    setTimeout(function() {
        button.innerHTML = originalText;
        button.classList.remove("btn-success");
        button.classList.add("btn-primary");
    }, 2000);
}

// دالة لتوليد معرف جلسة عشوائي
function generateRandomSessionId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// دالة للتحقق من صحة معرف الجلسة
function validateSessionId(sessionId) {
    // في الإصدار الحقيقي، هنا سيتم التحقق من صحة معرف الجلسة مع الخادم
    // للعرض التوضيحي، نقوم بالتحقق من الطول فقط
    return sessionId && sessionId.length >= 20;
}

// دالة لإنشاء اتصال مع Instagram API (محاكاة)
function connectToInstagramAPI(sessionId) {
    // في الإصدار الحقيقي، هنا سيتم إنشاء اتصال مع Instagram API
    // للعرض التوضيحي، نقوم بإرجاع وعد يتم حله بعد ثانيتين
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (validateSessionId(sessionId)) {
                resolve({ success: true, message: 'تم الاتصال بنجاح' });
            } else {
                reject({ success: false, message: 'فشل الاتصال، يرجى التحقق من معرف الجلسة' });
            }
        }, 2000);
    });
}

// دالة لتحميل صورة الملف الشخصي
function loadProfileImage() {
    const profileImageElements = document.querySelectorAll('.profile-image');
    if (profileImageElements.length > 0) {
        const imagePath = localStorage.getItem('instakit_profile_image') || 'images/IMG_9338.JPG';
        profileImageElements.forEach(img => {
            img.src = imagePath;
        });
    }
}

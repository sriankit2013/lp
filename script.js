// Survey state
let currentQuestion = 1;
const totalQuestions = 5;
const answers = {};

// Timer countdown
function updateTimer() {
    const timer = document.getElementById('timer');
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    timer.textContent = `Ends in ${hours}h ${minutes}m ${seconds}s`;
}

// Initialize timer
updateTimer();
setInterval(updateTimer, 1000);

// CTA button action - opens survey
function claimOffer() {
    const overlay = document.getElementById('surveyOverlay');
    overlay.classList.add('active');
    resetSurvey();
}

// Reset survey to beginning
function resetSurvey() {
    currentQuestion = 1;
    Object.keys(answers).forEach(key => delete answers[key]);
    updateProgress();
    showQuestion(1);
}

// Select an answer and move to next question
function selectAnswer(questionNum, answer) {
    answers[questionNum] = answer;
    
    // Add click animation
    event.target.style.background = 'linear-gradient(135deg, var(--walmart-yellow) 0%, #e6af1f 100%)';
    event.target.style.color = 'var(--dark)';
    
    setTimeout(() => {
        if (questionNum < totalQuestions) {
            currentQuestion = questionNum + 1;
            updateProgress();
            showQuestion(currentQuestion);
        } else {
            // Show delivery details screen directly after last question
            showQuestion('success');
            updateProgress(100);
        }
    }, 400);
}

// Show specific question
function showQuestion(questionNum) {
    const slides = document.querySelectorAll('.question-slide');
    
    slides.forEach(slide => {
        if (slide.dataset.question == questionNum) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
            slide.classList.add('exit-left');
            setTimeout(() => {
                slide.classList.remove('exit-left');
            }, 400);
        }
    });
}

// Update progress bar
function updateProgress(customPercent) {
    const progressFill = document.getElementById('progressFill');
    const questionCounter = document.getElementById('questionCounter');
    
    if (customPercent) {
        progressFill.style.width = customPercent + '%';
        questionCounter.textContent = 'Complete! 🎉';
    } else {
        const percent = (currentQuestion / totalQuestions) * 100;
        progressFill.style.width = percent + '%';
        questionCounter.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
    }
}

// Handle continue button click
function handleContinue() {
    // In a real implementation, this would redirect to the next step
    // For demo purposes, we'll show an alert
    alert('🎉 Redirecting to delivery confirmation page...\n\nIn a real implementation, this would take you to:\n- Address confirmation form\n- Sponsored deals page\n- Final reward delivery tracking');
    
    // Optionally close the modal
    closeSurvey();
}

// Close survey
function closeSurvey() {
    const overlay = document.getElementById('surveyOverlay');
    overlay.classList.remove('active');
}

// Close survey when clicking outside modal
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('surveyOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSurvey();
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .step, .benefit-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

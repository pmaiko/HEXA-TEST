import 'core-js'

let animationend = "transitionend";

addEventListener('DOMContentLoaded', function () {
    const toggleMenu = document.querySelector('#toggleMenu');
    const dropDownMenu = document.querySelector('.drop-down-menu');

    if (toggleMenu && dropDownMenu) {
        toggleMenu.addEventListener('click', function () {
            if (dropDownMenu.style.display !== 'none') {
                dropDownMenu.style.display = 'none';
                toggleMenu.classList.add('icon--menu');
                toggleMenu.classList.remove('icon--close');
            } else {
                dropDownMenu.style.display = 'block';
                toggleMenu.classList.remove('icon--menu');
                toggleMenu.classList.add('icon--close');
            }
        });
    }

    const timeLine = document.querySelector('.time-line');
    const timeLineList = document.querySelectorAll('.time-line__item');
    const currentDate = document.querySelector('.current-date');
    const currentDescription = document.querySelector('.current-description');
    let scrollTimeoutId;
    let resizeTimeoutId;
    let currentId;
    let gDelta = 0;
    let touchStart;
    let steps = [-200, -150, -100, -50, 0, 50, 100, 150, 200];

    if (timeLine && timeLineList && currentDate && currentDescription) {
        timeLine.addEventListener('click', function (e) {
            let el = e.target;

            if (el.classList.contains('btn-simple')) {
                let rotate = getRotation(el);
                let date = el.getAttribute('data-date');
                let description = el.getAttribute('data-description');

                currentId = parseInt(el.getAttribute('data-id'));
                gDelta = steps[el.getAttribute('data-id')];

                addRotate(timeLine, rotate);
                clearActive(timeLineList);
                addActive(el.parentNode);

                render({
                    currentDate: currentDate,
                    currentDescription: currentDescription,
                    date: date,
                    description: description
                });
            }
        });
        timeLineList.forEach(function (item, id) {
            if (item.classList.contains('active')) {
                currentId = id;
            }
        });

        let handlerMoveTimeLine = (e) => {
            e.preventDefault();

            let delta;
            if (e.touches) {
                delta = e.touches[0].clientX - touchStart;
                gDelta < steps[0] ? gDelta = steps[0] : gDelta > steps[timeLineList.length - 1] ? gDelta = steps[timeLineList.length - 1] : gDelta = -delta;

            } else {
                delta = e.deltaY || e.detail || e.wheelDelta;
                if (/Firefox/i.test(navigator.userAgent)) {
                    gDelta < steps[0] ? gDelta = steps[0] : gDelta > steps[timeLineList.length - 1] ? gDelta = steps[timeLineList.length - 1] : gDelta += delta * 8;
                }
                else {
                    gDelta < steps[0] ? gDelta = steps[0] : gDelta > steps[timeLineList.length - 1] ? gDelta = steps[timeLineList.length - 1] : gDelta += delta;
                }
            }

            let handler = () => {
                clearActive(timeLineList);

                let rotate = getRotation(timeLineList[currentId].querySelector('.btn-simple'));

                addActive(timeLineList[currentId]);
                addRotate(timeLine, rotate);

                render({
                    currentDate: currentDate,
                    currentDescription: currentDescription,
                    date: timeLineList[currentId].querySelector('.btn-simple').getAttribute('data-date'),
                    description: timeLineList[currentId].querySelector('.btn-simple').getAttribute('data-description')
                });
            };

            clearTimeout(scrollTimeoutId);
            scrollTimeoutId = setTimeout(() => {
                if (gDelta >= steps[currentId + 1]) {
                    currentId >= timeLineList.length - 1 ? currentId = timeLineList.length - 1 : currentId++;
                    handler();
                }

                if (gDelta <= steps[currentId - 1]) {
                    currentId <= 0 ? currentId = 0 : currentId--;
                    handler();
                }
            }, 0);
        };

        timeLine.addEventListener('mouseenter', function (e) {
            console.log(1);
            document.addEventListener(/Firefox/i.test(navigator.userAgent) ? "wheel" : "mousewheel", handlerMoveTimeLine, {
                passive: false
            });

        }, {
            passive: false
        });

        timeLine.addEventListener('mouseleave', function (e) {
            document.removeEventListener(/Firefox/i.test(navigator.userAgent)? "wheel" : "mousewheel", handlerMoveTimeLine, {
                passive: false
            });
        });

        timeLine.addEventListener("touchmove", handlerMoveTimeLine, false);
        timeLine.addEventListener("touchstart", (e) => {
           touchStart =  e.touches[0].clientX + steps[currentId];
        }, false);

        window.onresize = function () {
            clearTimeout(resizeTimeoutId);
            resizeTimeoutId = setTimeout(function () {
                let rotate = getRotation(timeLineList[currentId].querySelector('.btn-simple'));
                addRotate(timeLine, rotate);
            }, 100);
            return false;
        };
    }
});

function render({currentDate, currentDescription, date, description}) {

    toggle(currentDate, 'slideUp', ()=> {
        currentDate.innerHTML = date;
    });

    toggle(currentDescription, 'fa', ()=> {
        currentDescription.innerHTML = description;
    });
}

function addActive(el) {
    el.classList.add('active');
}

function clearActive(el) {
    el.forEach(function (item) {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
}

function addRotate(el, rotate) {
    if (window.innerWidth > 1900) {
        el.style.cssText = `transform: translate(-70%, -50%) rotate(${-rotate}deg);`;
    }

    else if (window.innerWidth <= 699) {
        el.style.cssText = `transform: translate(-50%, -28%) rotate(${-rotate}deg);`;
    }

    else if (window.innerWidth <= 991) {
        el.style.cssText = `transform: translate(-66.5%, -50%) rotate(${-rotate}deg);`;
    }

    else {
        el.style.cssText = `transform: translate(-68%, -50%) rotate(${-rotate}deg);`;
    }
}

function getRotation(el) {
    let transform = getComputedStyle(el).getPropertyValue("transform");

    if (transform !== "none") {
        let values = transform.split('(')[1].split(')')[0].split(',');
        return Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    }
}

function toggle(el, name, callback) {
    let clear = () => {
        el.classList.remove(name + '-leave-active');
        el.classList.remove(name + '-enter-active');
        el.classList.remove(name + '-enter');
    };
    clear();

    let handlerHide = function() {
        el.removeEventListener(animationend, handlerHide);
        clear();

        callback();

        let handlerShow = function() {
            clear();
            el.removeEventListener(animationend, handlerShow);
        };

        el.classList.add(name + '-enter');

        raf(function() {
            el.classList.add(name + '-enter-active');
            el.addEventListener(animationend, handlerShow);
        });
    };

    el.classList.add(name + '-leave-active');
    el.addEventListener(animationend, handlerHide);
}

function raf(fn) {
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            fn();
        });
    });
}


import 'core-js'

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

        let handlerScroll = (e) => {
            e.preventDefault();
            let delta = e.deltaY || e.detail || e.wheelDelta;
            gDelta < steps[0] ? gDelta = steps[0] : gDelta > steps[timeLineList.length - 1] ? gDelta = steps[timeLineList.length - 1] : gDelta += delta;

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
            console.log('mouseenter');

            document.addEventListener('mousewheel', handlerScroll, {
                passive: false
            });

        }, {
            passive: false
        });

        timeLine.addEventListener('mouseleave', function (e) {
            console.log('mouseleave');
            document.removeEventListener('mousewheel', handlerScroll, {
                passive: false
            });
        });

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
    setTimeout(() => {
        currentDate.innerHTML = date;
        currentDescription.innerHTML = description;
    }, 1000);
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

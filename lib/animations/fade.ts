const freq = 0.4;
let time = 20;

export function fadeOut(element: HTMLElement) {
    return new Promise<void>(resolve => {
        let opacity: number;
        if (element.style.opacity === "")
            opacity = 1;
        else
            opacity = Number.parseFloat(element.style.opacity);
        let interval = setInterval(() => {
            if (opacity > 0) {
                opacity -= freq;
                element.style.setProperty("opacity", opacity.toString());
            } else {
                clearInterval(interval);
                resolve();
            }
        }, time);
    });
}

export function fadeIn(element: HTMLElement) {
    return new Promise<void>(resolve => {
        let opacity: number;
        if (element.style.opacity === "")
            opacity = 0;
        else
            opacity = Number.parseFloat(element.style.opacity);
        let interval = setInterval(() => {
            if (opacity < 1) {
                opacity += freq;
                element.style.setProperty("opacity", opacity.toString());
            } else {
                clearInterval(interval);
                resolve();
            }
        }, time);
    });
}

export function fadeOutMultiple(...elements: HTMLElement[]) {
    return new Promise<void>(resolve => {
        let opacity = 1;
        let interval = setInterval(() => {
            if (opacity > 0) {
                opacity -= freq;
                for (let el of elements)
                    el.style.setProperty("opacity", opacity.toString());
            } else {
                clearInterval(interval);
                resolve();
            }
        }, time);
    });
}

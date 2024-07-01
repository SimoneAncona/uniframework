export function fadeOut(element: HTMLElement) {
    return new Promise<void>(resolve => {
        let opacity: number;
        if (element.style.opacity === "")
            opacity = 1;
        else
            opacity = Number.parseFloat(element.style.opacity);
        let interval = setInterval(() => {
            if (opacity > 0) {
                opacity -= 0.2;
                element.style.setProperty("opacity", opacity.toString());
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 10);
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
                opacity += 0.2;
                element.style.setProperty("opacity", opacity.toString());
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });
}

export function fadeOutMultiple(...elements: HTMLElement[]) {
    return new Promise<void>(resolve => {
        let opacity = 1;
        let interval = setInterval(() => {
            if (opacity > 0) {
                opacity -= 0.2;
                for (let el of elements)
                    el.style.setProperty("opacity", opacity.toString());
            } else {
                clearInterval(interval);
                resolve();
            }
        }, 10);
    });
}

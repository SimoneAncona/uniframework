export class RGBA {
    public r: number;
    public g: number;
    public b: number;
    public a: number;
    constructor(r: number, g: number, b: number, a: number = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public toCSS() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}

type Color = {
    light: RGBA,
    dark: RGBA,
}

export const defaultColors = {
    white: {light: new RGBA(250, 250, 250), dark: new RGBA(29, 30, 32)} as Color,
    gray: {light: new RGBA(222, 222, 222), dark: new RGBA(80, 80, 80)} as Color,
    lightGray: {light: new RGBA(245, 245, 246), dark: new RGBA(60, 60, 60)} as Color,
    black: {light: new RGBA(10, 10, 10), dark: new RGBA(253, 253, 253)} as Color,
    blue: {light: new RGBA(26, 172, 235), dark: new RGBA(23, 139, 189)} as Color,
    violet: {light: new RGBA(183, 127, 212), dark: new RGBA(130, 84, 153)} as Color,
}

export class Theme {
    public whiteColor: Color;
    public darkColor: Color;
    public primaryColor: Color;
    public secondaryColor: Color;
    private isDarkTheme = false;

    constructor(whiteColor: Color, darkColor: Color, primaryColor: Color, secondaryColor: Color) {
        this.whiteColor = whiteColor;
        this.darkColor = darkColor;
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }

    setLightTheme() {
        this.isDarkTheme = false;
        this.apply();
    }

    setDarkTheme() {
        this.isDarkTheme = true;
        this.apply();
    }

    switchColorTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.apply();
    }

    apply() {
        if (this.isDarkTheme) {
            document.documentElement.style.setProperty('--white', this.whiteColor.dark.toCSS());
            document.documentElement.style.setProperty('--dark', this.darkColor.dark.toCSS());
            document.documentElement.style.setProperty('--gray', defaultColors.gray.dark.toCSS());
            document.documentElement.style.setProperty('--lightgray', defaultColors.lightGray.dark.toCSS());
            document.documentElement.style.setProperty('--primary', this.primaryColor.dark.toCSS());
            document.documentElement.style.setProperty('--secondary', this.secondaryColor.dark.toCSS());
            return;
        }
        document.documentElement.style.setProperty('--white', this.whiteColor.light.toCSS());
        document.documentElement.style.setProperty('--dark', this.darkColor.light.toCSS());
        document.documentElement.style.setProperty('--gray', defaultColors.gray.light.toCSS());
        document.documentElement.style.setProperty('--lightgray', defaultColors.lightGray.light.toCSS());
        document.documentElement.style.setProperty('--primary', this.primaryColor.light.toCSS());
        document.documentElement.style.setProperty('--secondary', this.secondaryColor.light.toCSS());
    }

    get currentColorTheme() {
        return this.isDarkTheme ? "dark" : "light";
    }
}

export const defaultTheme: Theme = new Theme(defaultColors.white, defaultColors.black, defaultColors.blue, defaultColors.violet);
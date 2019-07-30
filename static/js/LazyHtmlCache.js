class LazyHtmlCache {
    constructor(props) {
        this.CONTENT_DOM_ID = props.elementId;
        this.AJAX_URL = props.url;
        this.AJAX_TYPE = props.type;
        this.TEMPLATE_FUNCTION = props.template;
        this.TEMPLATE_ITERATOR_KEY = props.templateKey;
        this.IDENTIFICATOR = props.id;
        this.cache = this.load();
    }

    async setContent(key) {
        if (!this.cache[key]) {
            await this.renderTemplate(key);
        } else if (this.cache[key].outdated) {
            await this.renderTemplate(key);
        }

        $(`#${this.CONTENT_DOM_ID}`).html(this.cache[key].template);
        let elementScrool = document.getElementById(`${this.CONTENT_DOM_ID}`);
        elementScrool.scrollTop = elementScrool.scrollHeight;
    }

    async renderTemplate(key) {
        const content = await this.getAjaxContent(key);
        const actualPointer = (!!this.cache[key]) ? this.cache[key].pointer:0;
        const newPointer = content[this.TEMPLATE_ITERATOR_KEY].length;

        let template_prop = "";

        for (let i = actualPointer; i < newPointer; i++) {
            template_prop += this.TEMPLATE_FUNCTION(content[this.TEMPLATE_ITERATOR_KEY][i]);
        }

        if (!this.cache[key]) {
            this.cache[key] = {
                template: template_prop,
                pointer: newPointer,
                outdated: false
            }
        } else {
            this.cache[key].template += template_prop;
            this.cache[key].pointer = newPointer;
            this.cache[key].outdated = false;
        }

        this.save();
    }

    async getAjaxContent(key) {
        return await $.ajax({
            type: this.AJAX_TYPE,
            url: `${this.AJAX_URL}/${key}`,
            success: (data) => {
                return data;
            }
        })
    }

    setAsOutdated(key) {
        if (this.cache) {
            if (this.cache[key]) {
                this.cache[key].outdated = true;
            }
        }
    }

    save() {
        localStorage.setItem(`LazyHtmlCache_cache_${this.IDENTIFICATOR}`, JSON.stringify(this.cache));
    }

     load() {
        return JSON.parse(localStorage.getItem(`LazyHtmlCache_cache_${this.IDENTIFICATOR}`)) || {};
    }

}
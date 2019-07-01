define(function () {
    return {
        template: `
            <div class="groupBox" :style="{left: left+'px',top: top+'px',height: height+'px',width: width+'px'}">
                <div class="grouoTitle">{{title}}</div>
                <div class="productsWrapper">
                    <div class="productItem" :class="{'unnormal': item.state === 'unnormal'}" v-for="(item,index) in list" :key="index" :style="{'flex-basis': 'calc(' + (100 / column) + '% - 3px)'}">{{item.name}}</div>
                    <div v-for="n in (column - list.length % column)" :key="n" :style="{'flex-basis': 'calc(' + (100 / column) + '% - 3px)'}"></div>
                </div>
            </div>
        `,
        props: {
            left: {
                default: 0
            },
            top: {
                default: 0
            },
            height: {
                default: 0
            },
            width: {
                default: 0
            },
            column: {
                default: 1
            },
            title: {
                default: ''
            },
            list: {
                default: []
            },
        },
    }
})
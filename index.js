
$(document).ready(function () {
    const input__data = [
        {
            type: 'text',
            id: 'name',
            label: 'Name',
            placeholder: 'Type your name...',
        },
        {
            type: 'text',
            id: 'address',
            label: 'Address',
            placeholder: 'Type your address...',
        },
        {
            type: 'text',
            id: 'phone',
            label: 'Phone',
            placeholder: 'Type your phone...',
        },
        {
            type: 'text',
            id: 'coupon',
            label: 'Coupon',
            placeholder: 'Type your coupon...',
        },
        {
            type: 'text',
            id: 'note',
            label: 'Note',
            placeholder: 'Type your note...',
        },

    ]
    const selects = [
        {
            label: 'District',
        },
        {
            label: 'Ward',
        },
        {
            label: 'Services'
        },
    ]
    const product = {
        "name":"Áo Polo",
        "code":"Polo123",
        "quantity": 1,
        "price": 200000,
        "length": 12,
        "width": 12,
        "height": 12,
        "category": 
        {
            "level1":"Áo"
        }
    }
    const addiamges = [
        'https://www.sodomach.com/uploads/contents/kinh-nghiem-kinh-doanh-shop-quan-ao-thoi-trang-online_1607073908.jpg',
        'https://www.baobiphuthanh.com/uploads/content/kinh-nghiem-kinh-doanh-quan-ao-online_1633689824.jpg'
    ]
    $('.product').html(
        `
        <div class="product__item">
            <div class="left">
                <img src="https://bizweb.dktcdn.net/thumb/1024x1024/100/415/697/products/1-af0c84b6-d733-4bef-8dcf-d8a7d6bc30b8.jpg" alt="">
                <div class="product__content">
                    <div class="heading">
                        ${product.name}
                    </div>
                    <div class="desc">
                        ${product.code}
                    </div>
                    <div class="prices">
                        <span>${product.quantity}</span>
                        <span>x</span>
                        <span>${product.price}vnd</span>
                    </div>
                </div>
            </div>
            <ion-icon name="close-circle-outline"></ion-icon>
        </div>
        `
    );
    $('.products').html(
        Array(8).fill().map(item=>{
            return `
                <div class="col col-3">
                    <div class="product__sale mt-4">
                        <img src="https://bizweb.dktcdn.net/thumb/1024x1024/100/415/697/products/1-af0c84b6-d733-4bef-8dcf-d8a7d6bc30b8.jpg" alt="">
                        <div class="title">
                            ${product.name}
                        </div>
                        <div class="price">
                            ${product.price}vnd
                        </div>
                    </div>
                </div>
            `
        })
    );
    $('.addiamges').html(
        addiamges.map(item=>{
            return `
                <img src="${item}" alt="">
            `
        })
    );
    $('.box').html(
        input__data.map(item=>{
            return `
                <div class = 'col col-6'>
                    <div class="input__item">
                        <label for="${item.id}">${item.label}:</label>
                        <input type="${item.type}" name="${item.id}" id="${item.id}" class="${item.id}" placeholder='${item.placeholder}' spellcheck='false'>
                    </div>
                </div>
            `
        })
    );
    $('.select__box').html(
        selects.map((item,index)=>{
            return `
                <div class="col col-6">
                    <div className="title">${item.label}:</div>
                    <div class="select__item">
                        <select ="${item.label}" id="${item.label}" class="select__item" ${index !== 0 && 'disabled'}>
                        </select>
                    </div>
                </div>
            `
        })
    );
    $('#products__fee').html(
        `<span class='product__fee__item'>${product.quantity*product.price}</span>
        <span>vnd</span>
        `
    );
    function getProvince(){
        $.ajax({
            type: "get",
            url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
            headers: {
                'token': '97617b3a-b132-11ed-9dc6-f64f768dbc22'
            },
            data: {
                "province_id":202
            },
            success: function (response) {
                const {data} = response
                $('#District').html(data.map(item=>{
                    return `
                        <option value="${item.DistrictID}" class="option" id='${item.DistrictID}'>${item.DistrictName}</option>
                    `
                }));
                $('#District').change(function (e) { 
                    $('.loading').css('display','flex');
                    e.preventDefault();
                    $.ajax({
                        type: "get",
                        url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?',
                        headers: {
                            'token': '97617b3a-b132-11ed-9dc6-f64f768dbc22'
                        },
                        data: {
                            "district_id": $('#District').val()
                        },
                        success: function (response) {
                            $('.loading').css('display','none');
                            const {data} = response
                            $('#Ward').html(
                                data.map(item=>{
                                    return `
                                    <option value="${item.WardCode}" class="option" id='${item.WardCode}'>${item.WardName}</option>
                                    `
                                })
                            );
                            $('#Ward').removeAttr('disabled');
                            $('#Ward').change(function (e) { 
                                e.preventDefault();
                                $('.loading').css('display','flex');
                                const order = {
                                    "from_district_id":1450,
                                    "service_id":53320,
                                    "service_type_id":null,
                                    "to_district_id": Number($('#District').val()),
                                    "to_ward_code":$('#Ward').val(),
                                    "height":product.height,
                                    "length":product.length,
                                    "weight":200,
                                    "width":product.width,
                                    "insurance_value":10000,
                                    "coupon": null
                                }
                                $.ajax({
                                    type: "get",
                                    url:'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?' ,
                                    headers: {
                                        'token': '97617b3a-b132-11ed-9dc6-f64f768dbc22',
                                        'ShopId': '3817797-hoinhungnguoidaytainang'
                                    },
                                    data: order,
                                    success: function (response) {
                                        $('.loading').css('display','none');
                                        const {data} = response
                                        $('#shipping__fee').html(data.total + 'vnd');
                                        $('.total__price').html(data.total + Number($('.product__fee__item').text())+'vnd');
                                    }
                                });
                                $.ajax({
                                    type: "get",
                                    url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
                                    headers: {
                                        'token': '97617b3a-b132-11ed-9dc6-f64f768dbc22',
                                        'ShopId': '3817797-hoinhungnguoidaytainang'
                                    },
                                    data: {
                                        "shop_id":885,
                                        "from_district": 1450,
                                        "to_district": Number($('#District').val())
                                    },
                                    success: function (response) {
                                        const {data} = response
                                        $('#Services').html(
                                            data.map(item=>{
                                                return `
                                                    <option value="${item.service_id}" class="option" id='${item.service_id}'>${item.short_name}</option>
                                                `
                                            })
                                        );
                                        $('#Services').removeAttr('disabled');
                                    }
                                });
                            });
                        }
                    });
                    
                });
            }
        });
    }
    getProvince()
});
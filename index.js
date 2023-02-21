
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
            id: 'content',
            label: 'Content',
            placeholder: 'Type your content...',
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
            label: 'Province',
        },
        {
            label: 'District',
        },
        {
            label: 'Ward',
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
    $('.box').html(
        input__data.map(item=>{
            return `
                <div class = 'col col-6'>
                    <div class="input__item">
                        <label for="${item.id}">${item.label}:</label>
                        <input type="${item.type}" name="${item.id}" id="${item.id}" class="${item.id}" placeholder='${item.placeholder}'>
                    </div>
                </div>
            `
        })
    );
    $('.select__box').html(
        selects.map((item,index)=>{
            return `
                <div class="col col-6">
                    <div class="select__item">
                        <select ="${item.label}" id="${item.label}" class="select__item" ${index !== 0 && 'disabled'}>
                        </select>
                    </div>
                </div>
            `
        })
    );
    function getProvince(){
        $.ajax({
            type: "get",
            url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
            headers: {
                'token': '97617b3a-b132-11ed-9dc6-f64f768dbc22'
            },
            success: function (response) {
                const {data} = response
                $('#Province').html(data.map(item=>{
                    return `
                        <option value="${item.ProvinceID}" class="option" id='${item.ProvinceID}'>${item.ProvinceName}</option>
                    `
                }));
                $('#Province').change(function (e) { 
                    e.preventDefault();
                    console.log($('#Province').val())
                    $.ajax({
                        type: "get",
                        url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
                        headers: {
                            'token': '97617b3a-b132-11ed-9dc6-f64f768dbc22'
                        },
                        data: {
                            "province_id": $('#Province').val()
                        },
                        success: function (response) {
                            const {data} = response
                            $('#District').html(
                                data.map(item=>{
                                    return `
                                    <option value="${item.DistrictID}" class="option" id='${item.DistrictID}'>${item.DistrictName}</option>
                                    `
                                })
                            );
                            $('#District').removeAttr('disabled');
                            $('#District').change(function (e) { 
                                e.preventDefault();
                                console.log( $('#District').val())
                                $.ajax({
                                    type: "get",
                                    url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id',
                                    headers: {
                                        'token': '97617b3a-b132-11ed-9dc6-f64f768dbc22'
                                    },
                                    data: {
                                        "district_id": 3218
                                    },
                                    success: function (response) {
                                        const {data} = response
                                        console.log(data)
                                        // $('#Ward').html(
                                        //     data.map(item=>{
                                        //         return `
                                        //         <option value="${item.WardCode}" class="option" id='${item.WardCode}'>${item.WardName}</option>
                                        //         `
                                        //     })
                                        // );
                                        // $('#Ward').removeAttr('disabled');
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
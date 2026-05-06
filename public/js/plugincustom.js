const dtcBaseUrl = location.hostname == 'localhost' ? 'https://plg.datacom.vn/' : 'https://plg.datacom.vn/';

const dtcRequestUrl = {
    Index: dtcBaseUrl + 'Flight/Index',
    SearchFlight: dtcBaseUrl + 'Flight/SearchFlight',
    SearchMinFare: dtcBaseUrl + 'Flight/SearchMinFare',
    VerifyFlight: dtcBaseUrl + 'Flight/VerifyFlight',
    AddService: dtcBaseUrl + 'Flight/AddService',
    GetAncillary: dtcBaseUrl + 'Flight/GetAncillary',
    GetSeatMap: dtcBaseUrl + 'Flight/GetSeatMap',
    GetFareRule: dtcBaseUrl + 'Flight/GetFareRule',
    // BookFlight: dtcBaseUrl + 'Flight/BookFlight',
    // BookFlight: 'https://localhost:7113/api/admin/blog/list',
      BookFlight: 'https://media.vietnam-tickets.com/api/bookings',
    GetFilter: dtcBaseUrl + 'Flight/GetFilter',
    Modal: {
        ModalDetailFare: dtcBaseUrl + 'Flight/GetModalDetailFare',
        ModalDetailCart: dtcBaseUrl + 'Flight/GetModalDetailCart',
    }
}
const dtcRequestViewUrl = {
    Index: dtcBaseUrl + 'Partial/Index',
    Search: dtcBaseUrl + 'Partial/Search',
    Progress: dtcBaseUrl + 'Partial/Progress',
    Filter: dtcBaseUrl + 'Partial/Filter',
    Passenger: dtcBaseUrl + 'Partial/Passenger',
    Payment: dtcBaseUrl + 'Partial/Payment',
    OrderCart: dtcBaseUrl + 'Partial/OrderCart',
    ListAirport: dtcBaseUrl + 'Partial/ListAirport',
    Month: dtcBaseUrl + 'Partial/Month'
}
const urlParams = new URLSearchParams(window.location.search);
function selectDepartDate() {
    if (document.querySelector('.dtc-itin-select .dtc-active[data-value="RT"]'))
        document.querySelector('.dtc-search-input-oneway [name="ReturnDate"]').click();
}
const dtcCommon = function () {
    const paxArr = {
        'ADT': 'Người lớn',
        'CHD': 'Trẻ em',
        'INF': 'Em bé'
    };
    const loadScript = function (url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => resolve(url);
            script.onerror = () => reject(new Error(`Failed to load script ${url}`));
            document.head.appendChild(script);
        });
    }
    const execBodyScripts = function (bodyEl) {
        function evalScript(elem) {
            const data = (elem.text || elem.textContent || elem.innerHTML || '');
            const head = document.getElementsByTagName('head')[0] ||
                document.documentElement;
            const s = document.createElement('script');

            if (elem.src) {
                //data = httpGet(elem.src);
                loadScript(elem.src)
                    .then((url) => {
                        console.log(`Script ${url} loaded successfully.`);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                elem.parentNode.removeChild(elem);
                return;
            }

            try {
                if (data)
                    s.appendChild(document.createTextNode(data));
            } catch (e) {
                s.text = data;
            }

            elem.parentNode.removeChild(elem);
            head.appendChild(s);
            head.removeChild(s);
        };

        bodyEl.querySelectorAll('script').forEach(child => {
            if (!child.type || child.type.toLowerCase() === 'text/javascript') {
                evalScript(child);
            }
        });
    }
    const checkAuth = function (data) {
        try {
            const jsonRes = JSON.parse(data);
            if (!jsonRes.Success && jsonRes.StatusCode === "003") {
                const modal = document.querySelector('#dtc-modal');
                const modalBody = modal.querySelector(".dtc-modal-body");
                modalBody.innerHTML = `<div class="dtc-loading-book dtc-mt-3 dtc-p-5"><div style="text-align: center">
                                           <h3 class="dtc-pri-cl">Phiên làm việc của bạn đã hết hạn</h3>
                                           <div class="dtc-mb-1 dtc-dark-cl">Vui lòng tải lại trang.</div>
                                       </div></div>`;
                modal.querySelector(".dtc-btn-modal-close").style.display = "none";
                modal.classList.add('dtc-show');

                return true;
            }
        } catch {
            return false;
        }
    }
    const getView = function (element, url, callback) {
        element.innerHTML = '<div class="dtc-loader"></div>';
        const res = dtcHttpRequest.get(url);
        if (checkAuth(res)) return;
        else {
            element.innerHTML = res;
            execBodyScripts(element);
            if (callback)
                callback();
            initDropdown();
        }
    }
    const postData = function (url, req, fun) {
        dtcHttpRequest.post(url, req, function (data) {
            if (checkAuth(data)) return;
            else {
                fun(data);
            }
        });
    }
    const postView = function (element, url, req, callback) {
        postData(url, req, function (data) {
            element.innerHTML = data;
            execBodyScripts(element);
            if (callback)
                callback();
        });
    }
    const dateToDmy = function (date, key = '/') {
        if (date) {
            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();

            if (dd < 10) dd = `0${dd}`;
            if (mm < 10) mm = `0${mm}`;

            return dd + key + mm + key + yyyy;
        }

        return '';
    }
    const getMinFareOption = function (list) {
        //Get lowest fare in ListFareOption of AirOption
        if (list != null && list.length) {
            //if (!checkDomestic(listFareOption[0].ListFarePax[0].ListFareInfo[0].StartPoint,
            //    listFareOption[0].ListFarePax[0].ListFareInfo[0].EndPoint))
            //    return listFareOption[0];

            for (let i = 0; i < list.length; i++) {
                const fareOption = list[i];
                if (fareOption.ListFarePax != null && fareOption.ListFarePax.length) {
                    const fareAdt = fareOption.ListFarePax[0];
                    if (fareAdt.ListFareInfo != null && fareAdt.ListFareInfo.length) {
                        const fareInfo = fareAdt.ListFareInfo[0];
                        if (fareInfo.Availability > 0) {
                            return fareOption;
                        }
                    }
                }
            }
        }

        //Return default first
        return list[0];
    }
    const getTime = function (date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
    function expand(element) {
        element.style.height = element.scrollHeight + 'px';
        element.addEventListener('transitionend', function handler() {
            element.classList.add('dtc-open');
            element.style.removeProperty('height');
            element.removeEventListener('transitionend', handler);
        });
    }
    function collapse(element) {
        element.style.height = element.scrollHeight + 'px';
        requestAnimationFrame(() => {
            element.style.removeProperty('height');
            element.classList.remove('dtc-open');
        });
    }
    const mapData = function (data, view) {
        for (let child of view.children) {
            for (let attr of child.attributes) {
                if (attr.value.includes('{{')) {
                    attr.value = attr.value.replace(/{{\s*(\w+)\s*}}/g, function (_, p1) {
                        return data[p1] || '';
                    });
                }
            }
            if (child.hasAttribute('dtc-value')) {
                const value = data[child.getAttribute('dtc-value')];
                child.removeAttribute('dtc-value');
                if (value) {
                    if (child.tagName === 'INPUT') {
                        child.value = value;
                    }
                    else {
                        child.innerHTML = value;
                    }
                } else {
                    child.remove();
                }
            } else if (child.hasAttribute('dtc-arr')) {
                const arr = data[child.getAttribute('dtc-arr')];
                child.removeAttribute('dtc-arr');
                if (arr)
                    mapArrData(arr, child);
                else {
                    child.remove();
                }
            }
            else {
                mapData(data, child);
            }
        }
    }
    const mapArrData = function (arr, child) {
        const element = document.createElement(child.tagName);
        element.innerHTML = child.innerHTML;
        child.innerHTML = '';
        const c = child.getAttribute('dtc-class');

        arr.forEach(item => {
            const elementTem = document.createElement(child.tagName);
            elementTem.innerHTML = element.innerHTML;

            if (c)
                elementTem.className = c;

            child.appendChild(elementTem);
            mapData(item, elementTem);
        });
    }
    const mapDataToView = function (data, view) {
        if (Array.isArray(data)) mapArrData(data, view);
        else mapData(data, view);
    }
    const toggleDropdown = function (element) {
        element.classList.toggle("dtc-show");
        //document.querySelectorAll('.dtc-baggage-head').forEach(e => {
        //    if (e.classList.contains('dtc-show')) {
        //        if (e.dataset.outside) {
        //            if (!e.closest('.dtc-baggage').contains(element)) {
        //                e.classList.remove('dtc-show');
        //            }
        //        }
        //        else {
        //            if (!e.contains(element)) {
        //                e.classList.remove('dtc-show');
        //            }
        //        }
        //    }
        //});
    }
    const initDropdown = function () {
        //document.querySelectorAll('.dtc-dropdown-btn').forEach(element => {
        //    element.addEventListener('click', function () {
        //        this.classList.toggle('dtc-show');
        //    });
        //});
    }
    const resizeCollapse = function () {
        document.querySelectorAll('.dtc-collapse').forEach(e => {
            if (e.classList.contains('dtc-open')) {
                e.style.height = "100%";
            }
        });
    }
    const showBtnLoader = function (element) {
        if (element) {
            const loader = element.querySelector(".dtc-button-loader");
            if (!loader) element.insertAdjacentHTML("beforeend", "<div class='dtc-button-loader'></div>");
            element.disabled = true;
        }
    }
    const hideBtnLoader = function (element) {
        if (element) {
            const loader = element.querySelector(".dtc-button-loader");
            if (loader) loader.remove();
            element.disabled = false;
        }
    }
    return {
        dateToDmy,
        execBodyScripts,
        getView,
        postView,
        getMinFareOption,
        mapDataToView,
        toggleDropdown,
        resizeCollapse,
        initDropdown,
        showBtnLoader,
        hideBtnLoader,
        checkDomestic: function (startPoint, endPoint) {
            const domesticAirport = [
                'BMV', 'CAH', 'CXR', 'NHA', 'DAD', 'DIN', 'DLI', 'HAN', 'HPH', 'HUI', 'PQC', 'PXU', 'SGN', 'TBB', 'THD',
                'TMK', 'UIH', 'VCA', 'VCL', 'VCS', 'VDH', 'VII', 'VKG', 'VDO'
            ];
            return domesticAirport.indexOf(startPoint) > -1 && domesticAirport.indexOf(endPoint) > -1;
        },
        dateStringToDate: function (dateString, day = 0) {
            let date = null;
            if (dateString) {
                if (dateString.indexOf('/') > -1) {
                    const dateParts = dateString.split('/');
                    date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0] + day);
                }
                else {
                    date = new Date(+dateString.substr(4, 4), dateString.substr(2, 2) - 1, +dateString.substr(0, 2) + day);
                }
            }
            return date;
        },
        dateStringToDmy: function (dateString, day = 0) {
            return dtcCommon.dateToDmy(dtcCommon.dateStringToDate(dateString, day));
        },
        postJson: function (url, data, fun) {
            postData(url, data, function (res) {
                fun(JSON.parse(res));
            });
        },
        makeid: function (length) {
            let result = '';
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        },
        getAirport: function (code) {
            return dtcData.airports.find(s => s.Code === code);
        },
        getCity: function (code) {
            return dtcData.cities.find(s => s.Code === code);
        },
        getCountry: function (code) {
            return dtcData.countries.find(s => s.Code === code);
        },
        getAircraft: function (code, mode = 'brief') {
            const aircraft = dtcData.aircrafts.find(s => s.Code === code);
            if (aircraft != null) {
                if (mode == 'full') {
                    return aircraft.Manufacturer + ' ' + aircraft.Model;
                }
                else if (mode == 'brief') {
                    return aircraft.Manufacturer + ' ' + code;
                }
                else if (mode == 'min') {
                    if (aircraft.Manufacturer.trim().toLowerCase() == 'airbus') {
                        return 'A' + code;
                    }
                    else if (aircraft.Manufacturer.trim().toLowerCase() == 'boeing') {
                        return 'B' + code;
                    }
                }
            }
            return code;
        },
        getAirline: function (code) {
            return dtcData.airlines.find(s => s.Code === code);
        },
        formatMoney: function (amount, decimalCount = 0, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = amount < 0 ? "-" : "";

                const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                const j = (i.length > 3) ? i.length % 3 : 0;

                return negativeSign +
                    (j ? i.substr(0, j) + thousands : '') +
                    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                    (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                console.log(e)
            }
        },
        getDuration: function (duration, shortFormat = false) {
            if (duration > 0) {
                const time = new Date();
                const now = new Date();
                time.setMinutes(time.getMinutes() + duration);
                let span = time - now;

                const hours = Math.floor(span / (1000 * 60 * 60));
                span -= hours * (1000 * 60 * 60);

                const mins = Math.floor(span / (1000 * 60));
                span -= mins * (1000 * 60);

                let str = '';
                if (shortFormat) {
                    if (hours > 0) {
                        str += hours + 'h';
                    }
                    if (mins > 0) {
                        str += mins;
                    }
                }
                else {
                    if (hours > 0) {
                        str += hours + (/*language == 'vi'*/ true ? ' giờ ' : 'h ');
                    }
                    if (mins > 0) {
                        str += mins + (/*language == 'vi'*/ true ? 'p' : 'm');
                    }
                }
                return str.trim();
            }
            else {
                return '';
            }
        },
        getTimeFlight: function (date1, date2) {
            const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

            // Tính toán sự chênh lệch thời gian giữa hai ngày (tính bằng milliseconds)
            const timeDifference = Math.abs(d2 - d1);

            // Chuyển đổi sự chênh lệch thời gian từ milliseconds sang ngày
            const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
            return {
                TimeStart: getTime(date1),
                TimeEnd: getTime(date2),
                DayDifference: dayDifference
            }
        },
        collapse: function (id, element) {
            const detail = document.getElementById(id);
            if (detail.classList.contains('dtc-open')) {
                if (element)
                    element.classList.remove('active');

                collapse(detail);
            } else {
                if (element)
                    element.classList.add('active');

                expand(detail);
            }
        },
        closeCollapse: function (detail) {
            collapse(detail);
        },
        getPaxName: function (paxType) {
            return paxArr[paxType];
        },
        removeVietnameseTones: function (str) {
            if (!str)
                return '';

            str = str.replace(/á|à|ả|ã|ạ|â|ấ|ầ|ẩ|ẫ|ậ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a");
            str = str.replace(/Á|À|Ả|Ã|Ạ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ/g, "A");
            str = str.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e");
            str = str.replace(/É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/g, "E");
            str = str.replace(/í|ì|ỉ|ĩ|ị/g, "i");
            str = str.replace(/Í|Ì|Ỉ|Ĩ|Ị/g, "I");
            str = str.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o");
            str = str.replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, "O");
            str = str.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u");
            str = str.replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, "U");
            str = str.replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y");
            str = str.replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, "Y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/Đ/g, "D");
            str = str.replace(/\s+/g, ' ');
            str = str.trim();

            return str;
        },
        scrollTo: function (ele) {
            if (!ele)
                ele = document.querySelector('body');

            window.scrollTo({
                top: ele.offsetTop,
                behavior: 'smooth'
            });
        },
        maxPassenger: function (adt, chd, inf) {
            adt = Math.abs(Number(adt) || 1);
            chd = Math.abs(Number(chd) || 0);
            inf = Math.abs(Number(inf) || 0);

            if (adt > 9) adt = 9;

            if (chd > adt * 2) chd = adt * 2;

            if (chd > 9 - adt) chd = 9 - adt;

            if (inf > adt) inf = adt;

            if(inf + chd > adt * 2) inf = adt * 2 - chd;

            return {
                adt,
                chd,
                inf
            }
        },
        formatFlightDate: function (dateStr) {
            if (dateStr) {
                const newDate = new Date(dateStr);
                const date = newDate.getDate();
                const month = newDate.getMonth() + 1;
                // Return the date in dd/MM/yyyy format
                return `${date < 10 ? '0' + date : date}/${month < 10 ? '0' + month : month}/${newDate.getFullYear()}`;
            }
            return "";
        },
        checkValidityForm: function (form) {
            let invalid = false;
            [...form.querySelectorAll('input[required]')].forEach(item => {
                if (!item.value) {
                    invalid = true
                }
            })
            return invalid;
        }
    }
}();
const dtcSearch = function () {
    let inputTarget;
    let inputMonthTarget;
    let timeOutSearchAirport;
    const addRoute = function () {
        const routeMultiple = document.querySelectorAll('#formSearchMulti .dtc-search-input-multi').length;

        const listRoute = document.querySelector('.dtc-list-route');
        const lastChild = listRoute.querySelector('.dtc-search-input-multi:last-child');
        const cl = lastChild.cloneNode();
        cl.innerHTML = lastChild.innerHTML;
        const endPoint = lastChild.querySelector('[name="EndPoint"]');
        cl.querySelector('.dtc-route-name').innerText = `Chặng bay ${routeMultiple + 1}`;
        cl.querySelector('[name="StartPoint"]').value = endPoint.value;
        cl.querySelector('[name="EndPoint"]').value = '';
        cl.querySelector('[name="StartPoint"]').setAttribute('data-value', endPoint.dataset.value);
        cl.querySelector('[name="DepartDate"]').value = dtcCommon.dateStringToDmy(lastChild.querySelector('[name="DepartDate"]').value, 3);
        listRoute.appendChild(cl);
    }
    const delRoute = function (element) {
        let listRoute = document.querySelectorAll('.dtc-list-route .dtc-search-input-multi');

        if (listRoute.length > 1) {
            element.closest('.dtc-search-input-multi').remove();

            listRoute = document.querySelectorAll('.dtc-list-route .dtc-search-input-multi').forEach((node, i) => {
                node.querySelector(".dtc-route-name").innerHTML = "Chặng bay " + (i + 1);
            })
        }
    }
    const changeItin = function (element) {
        if (element.classList.contains('dtc-active')) return;

        const val = element.dataset.value;
        const searchInput = document.querySelector('.dtc-search-input');
        searchInput.classList.remove('dtc-one-way');
        searchInput.classList.remove('dtc-multi-city');

        element.closest('.dtc-itin-select').querySelector('.dtc-active').classList.remove('dtc-active');
        const mobileItin = document.querySelector('#dtc-itin-mobile').querySelector('.dtc-active');
        if (mobileItin) mobileItin.classList.remove('dtc-active');
        element.classList.add('dtc-active');
        if (element.closest('.dtc-dropdown') && element.closest('.dtc-dropdown').querySelector('.dtc-dropdown-btn')) {
            element.closest('.dtc-dropdown').querySelector('.dtc-dropdown-btn').innerHTML = element.innerHTML;
        }

        switch (val) {
            case 'OW':
                searchInput.classList.add('dtc-one-way');
                document.querySelectorAll('.dtc-list-route .dtc-search-input-multi:not(:first-child)').forEach(item => item.remove());
                document.querySelector('.dtc-search-input-oneway [name="ReturnDate"]').value = '';
                document.querySelector('.dtc-search-input-oneway [name="ReturnMonth"]').value = '';
                document.querySelector('#dtc-radio-ow').checked = true;
                document.querySelector('#dtc-radio-ow').classList.add('dtc-active');
                break;
            case 'RT':
                searchInput.classList.add('dtc-one-way');
                document.querySelectorAll('.dtc-list-route .dtc-search-input-multi:not(:first-child)').forEach(item => item.remove());
                if (!document.querySelector('.dtc-search-input-oneway [name="ReturnDate"]').value) {
                    document.querySelector('.dtc-search-input-oneway [name="ReturnDate"]').value = dtcCommon.dateStringToDmy(document.querySelector('.dtc-search-input-oneway [name="DepartDate"]').value, 3);
                }
                document.querySelector('#dtc-radio-rt').checked = true;
                document.querySelector('#dtc-radio-rt').classList.add('dtc-active');
                const dtcCkbMonth = document.querySelector("[name='CkbMonth']");
                if (dtcCkbMonth && dtcCkbMonth.checked) document.querySelector('.dtc-search-input-oneway [name="ReturnMonth"]').click();
                break;
            case 'MC':
                {
                    searchInput.classList.add('dtc-multi-city');
                }
                break;
            default:
        }
    }
    const reserveRoute = function (element) {
        const route = element.closest('.dtc-search-input-route');
        const startPoint = route.querySelector('[name="StartPoint"]');
        const endPoint = route.querySelector('[name="EndPoint"]');
        const startPointCode = route.querySelector('.start-point-code');
        const endPointCode = route.querySelector('.end-point-code');

        const tempText = startPoint.value;
        const tempCode = startPoint.dataset.value;

        startPointCode.innerText = endPointCode.innerText;
        endPointCode.innerText = tempCode;
        startPoint.value = endPoint.value;
        startPoint.setAttribute('data-value', endPoint.dataset.value);

        endPoint.value = tempText;
        endPoint.setAttribute('data-value', tempCode);
    }
    const closeRoute = function () {
        if (window.window.innerWidth > 576) {
            dtcListAirport.classList.remove('dtc-open');
        }
        else {
            dtcListAirport.classList.add('dtc-close');
            setTimeout(function () {
                dtcListAirport.classList.remove('dtc-close');
                dtcListAirport.classList.remove('dtc-open');
                // nếu nằm trong modal search thì không bỏ hidden nữa
                if (!document.querySelector('#dtcDisplaySearch').classList.contains('dtc-search-mobile-wrap')) {
                    removeHiddenBody();
                }
            }, 300)
        }
    }
    const addHiddenBody = function () {
        document.querySelector("body").classList.add("dtc-m-overflow-hidden");
    }
    const removeHiddenBody = function () {
        document.querySelector("body").classList.remove("dtc-m-overflow-hidden");
    }
    const focusInput = function (element) {
        inputTarget = element;
        tabSearchFixed.style.display = 'flex';
        document.getElementById('resultSearchAirport').style.display = 'none';
        document.getElementById('searchAirport').value = '';
        dtcListAirport.querySelector('.dtc-tab-content .dtc-d-none')?.classList.remove('dtc-d-none');
        if (element.name === 'EndPoint') {
            const route = inputTarget.closest('.dtc-search-input-route');
            const startPoint = route.querySelector('[name="StartPoint"]');

            if (startPoint.value === element.value) {
                element.value = '';
            }

            if (startPoint.value) {
                dtcListAirport.querySelector(`.dtc-tab-content [data-value="${startPoint.dataset.value}"]`)?.classList.add('dtc-d-none');
            }

            dtcListAirport.querySelector('.route-text').innerHTML = 'Chọn điểm đến';
        }
        else {
            dtcListAirport.querySelector('.route-text').innerHTML = 'Chọn điểm đi';
        }
        removeHiddenBody();
        addHiddenBody();

        dtcListAirport.classList.add('dtc-open');
        dtcListAirport.style.top = 0 + 'px';
        dtcListAirport.style.left = 1 + 'px';

        const rect1 = element.getBoundingClientRect();
        const rect2 = dtcListAirport.getBoundingClientRect();
        if (window.window.innerWidth > 576) {
            dtcListAirport.style.top = rect1.bottom - rect2.top + 'px';
            dtcListAirport.style.left = rect1.left - rect2.left + 'px';
        }
        else {
            dtcListAirport.style.top = 0 + 'px';
            dtcListAirport.style.left = 0 + 'px';

            //dtcListAirport.style.top = - rect2.top + 'px';
            //dtcListAirport.style.left = - rect2.left + 'px';
        }

        //searchAirport.focus();
    }
    const openTab = function (element) {
        if (element.classList.contains('active')) return;

        element.parentElement.querySelector('.active').classList.remove('active');
        element.classList.add('active');
        const tab = element.closest('.dtc-tab');
        tab.querySelector('.dtc-tab-content.active').classList.remove('active');
        tab.querySelector(`#dtc-tab-${element.dataset.target}`).classList.add('active');
    }
    const clickPoint = function (element) {
        inputTarget.value = element.dataset.text;
        inputTarget.closest('.dtc-form-floating').querySelector('.dtc-vertical-point-left').innerText = element.dataset.value
        inputTarget.setAttribute('data-value', element.dataset.value);
        const route = inputTarget.closest('.dtc-search-input-route');
        if (inputTarget.name === 'StartPoint') {
            route.querySelector('[name="EndPoint"]').focus();
        }
        else if (inputTarget.name === 'EndPoint') {
            dtcListAirport.classList.remove('dtc-open');
            const dtcCkbMonth = document.querySelector("[name='CkbMonth']");
            if (dtcCkbMonth && dtcCkbMonth.checked) {
                route.parentElement.querySelector('[name="DepartMonth"]').click();
            }
            else {
                route.parentElement.querySelector('[name="DepartDate"]').click();
            }
        }
        if (!document.querySelector('#dtcDisplaySearch').classList.contains('dtc-search-mobile-wrap')) {
            removeHiddenBody();
        }
    }
    const init = function () {
        dtcListAirport = document.querySelector("#dtcListAirport");
        dtcCommon.getView(dtcListAirport, dtcRequestViewUrl.ListAirport)

        window.addEventListener('click', function (event) {
            const div = document.querySelector('#dtcListAirport.dtc-open');
            if (div) {
                const element = event.target;

                if (element !== inputTarget && !element.closest('#dtcListAirport') && element != document.querySelector(".dtc-search-input")) {
                    if (window.window.innerWidth > 576) {
                        dtcListAirport.classList.remove('dtc-open');
                    }
                    else {
                        dtcListAirport.classList.add('dtc-close');
                        setTimeout(function () {
                            dtcListAirport.classList.remove('dtc-open');
                            dtcListAirport.classList.remove('dtc-close');
                            dtcSearch.removeHiddenBody();
                        }, 300)
                    }
                }
            }
        });
        document.addEventListener('click', function (event) {
            document.querySelectorAll('.dtc-total-fare').forEach(element => {
                if (element.classList.contains('dtc-show') && !element.contains(event.target)) {
                    element.classList.remove('dtc-show');
                    element.classList.remove('dropup');
                }
            });
            document.querySelectorAll('.dtc-dropdown-btn').forEach(element => {
                if (element.classList.contains('dtc-show')) {
                    // nếu có element có thuộc tính data-outside => chỉ khi click outside mới đóng dropdown
                    if (element.dataset.outside) {
                        if (!element.closest('.dtc-dropdown').contains(event.target)) {
                            element.classList.remove('dtc-show');
                        }
                    }
                    else {
                        if (!element.contains(event.target)) {
                            element.classList.remove('dtc-show');
                        }
                    }
                }
            });
            if (event.target.classList.contains('dtc-dropdown-btn')) {
                event.target.classList.toggle('dtc-show');
            }
            if (event.target.classList.contains('dtc-dropdown-btn')) {
                event.target.classList.toggle('dtc-show');
            }
            if (event.target.closest('.dtc-dropdown-btn')) {
                event.target.closest('.dtc-dropdown-btn').classList.toggle('dtc-show');
            }
            const dropdownPax = document.querySelector('.dtc-dropdown-pax');
            const btnPax = event.target.classList.contains('dtc-dropdown-btn-pax') ? event.target : event.target.closest('.dtc-dropdown-btn-pax');
            if (dropdownPax.classList.contains('dtc-show') && !event.target.closest('.dtc-dropdown-pax') && !btnPax) {
                dropdownPax.classList.remove('dtc-show');
            }

            if (btnPax) {
                dropdownPax.classList.toggle('dtc-show');
                dropdownPax.style.top = 0 + 'px';
                dropdownPax.style.left = 0 + 'px';
                const rect1 = dropdownPax.getBoundingClientRect();
                const rect2 = btnPax.getBoundingClientRect();
                dropdownPax.style.width = rect2.width + 'px';
                dropdownPax.style.top = rect2.top + rect2.height - rect1.top + 'px';
                dropdownPax.style.left = rect2.left - rect1.left + 'px';

                if (btnPax.id === 'dtc-pax-number-mobile' || btnPax.id === 'dtc-pax-number') {
                    dropdownPax.style.top = rect2.top - rect1.top - rect1.height + 'px';
                }
            }

            const dropdownPreferCabin = document.querySelector('.dtc-dropdown-prefer-cabin');
            const btnPreferCabin = event.target.classList.contains('dtc-dropdown-btn-prefer-cabin') ? event.target : event.target.closest('.dtc-dropdown-btn-prefer-cabin');
            if (dropdownPreferCabin.classList.contains('dtc-show') && !event.target.closest('.dtc-dropdown-prefer-cabin') && !btnPreferCabin) {
                dropdownPreferCabin.classList.remove('dtc-show');
            }

            if (btnPreferCabin) {
                dropdownPreferCabin.classList.toggle('dtc-show');
                dropdownPreferCabin.style.top = 0 + 'px';
                dropdownPreferCabin.style.left = 0 + 'px';
                const rect3 = dropdownPreferCabin.getBoundingClientRect();
                const rect4 = btnPreferCabin.getBoundingClientRect();
                dropdownPreferCabin.style.width = rect4.width + 'px';
                dropdownPreferCabin.style.top = rect4.top + rect4.height - rect3.top + 'px';
                dropdownPreferCabin.style.left = rect4.left - rect3.left + 'px';

                if (btnPreferCabin.id === 'dtc-prefer-cabin' || btnPreferCabin.id === 'dtc-prefer-cabin-mobile') {
                    dropdownPreferCabin.style.top = rect4.top - rect3.top - rect3.height + 'px';
                }
            }

            const checkboxes = document.querySelectorAll('.dtc-form-check-input');

            const syncCheckboxes = (changedCheckbox) => {
                const changedValue = changedCheckbox.value;

                checkboxes.forEach(checkbox => {
                    if (checkbox.value === changedValue) {
                        checkbox.checked = changedCheckbox.checked;
                    }
                });
            };

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => syncCheckboxes(checkbox));
            });

            //prefer cabin
            const radioButtons = document.querySelectorAll('input[name^="PreferCabin"]');

            const preferCabinInput = document.getElementById('dtc-prefer-cabin-mobile');
            const preferCabinInputMulti = document.getElementById('dtc-prefer-cabin');

            radioButtons.forEach((radio) => {
                radio.addEventListener('change', function () {
                    if (this.checked) {
                        const label = this.closest('.dtc-form-radio').querySelector('.dtc-form-radio-label').innerText;
                        preferCabinInput.value = label;
                        preferCabinInputMulti.value = label;
                    }
                });
            });
        });
        dtcCommon.initDropdown();
        document.querySelectorAll('.dtc-close-dropdown').forEach(element => {
            if (element.closest('.dtc-dropdown')) {
                const dropdownBtn = element.closest('.dtc-dropdown').querySelector('.dtc-dropdown-btn');
                if (dropdownBtn) {
                    element.addEventListener('click', function () {
                        dropdownBtn.classList.remove('dtc-show');
                        dtcSearch.removeHiddenBody();
                    });
                }
            }
        });
        document.getElementById('dtc-radio-ow').addEventListener('click', function () {
            changeItin(document.querySelector('.dtc-itin-select [data-value="OW"]'));
        });
        const dtcCkbMonths = document.querySelectorAll("[name='CkbMonth']");
        if (dtcCkbMonths) {
            dtcCkbMonths.forEach(e => {
                e.addEventListener('change', function () {
                    if (this.checked) {
                        document.querySelector('.dtc-search-input-date.dtc-search-input-container').style.display = 'none';
                        document.querySelector('.dtc-search-input-date.dtc-search-input-container.dtc-search-month').style.removeProperty('display');
                        formSearchMulti.classList.add('dtc-search-month');
                    }
                    else {
                        document.querySelector('.dtc-search-input-date.dtc-search-input-container').style.removeProperty('display');
                        document.querySelector('.dtc-search-input-date.dtc-search-input-container.dtc-search-month').style.display = 'none';
                        formSearchMulti.classList.remove('dtc-search-month');
                    }
                })
            })
        }

        const listInp = [...document.querySelectorAll('#dtc-dropdown-option .dtc-form-check input[type="checkbox"]')];

        listInp.forEach(item => {
            item.addEventListener('click', function () {
                const all = document.getElementById('dtc-option-air-all');

                if (item.id === 'dtc-option-air-all') {
                    listInp.forEach(l => {
                        l.checked = all.checked;
                    })
                }
                else {
                    if (!item.checked)
                        all.checked = false;
                    else if (!all.checked && document.querySelectorAll('.filter-airline input[type="checkbox"]:checked').length === listInp.length - 1) {
                        all.checked = true;
                    }
                }
            })
        })
    }
    function convertDateFormat(dateString) {
        // Extract the day, month, and year from the input string
        const day = dateString.substring(0, 2);
        const month = dateString.substring(2, 4);
        const year = dateString.substring(4, 8);

        // Return the date in dd/MM/yyyy format
        return `${day}/${month}/${year}`;
    }
    const setValueSearch = function (request) {
        dtcCommon.getView(dtcDisplaySearch, dtcRequestViewUrl.Search + location.search);
    }
    const changeNum = function (element, num) {
        if (element.classList.contains('dtc-disable')) return;

        const inp = element.parentElement.querySelector('input');
        inp.value = Number(inp.value) + num;

        changeTextNumPassenger(document.querySelector('[name="Adt"]').value, document.querySelector('[name="Chd"]').value, document.querySelector('[name="Inf"]').value);
    }
    const changeTextNumPassenger = function (adt, chd, inf) {
        const m = dtcCommon.maxPassenger(adt, chd, inf);

        adt = m.adt;
        chd = m.chd;
        inf = m.inf;

        const minusAdt = document.querySelector('[data-pax-type="Adt"] .dtc-minus');
        const minusChd = document.querySelector('[data-pax-type="Chd"] .dtc-minus');
        const minusInf = document.querySelector('[data-pax-type="Inf"] .dtc-minus');
        const plusAdt = document.querySelector('[data-pax-type="Adt"] .dtc-plus');
        const plusChd = document.querySelector('[data-pax-type="Chd"] .dtc-plus');
        const plusInf = document.querySelector('[data-pax-type="Inf"] .dtc-plus');
        plusChd.classList.add('dtc-disable');
        plusInf.classList.add('dtc-disable');

        if (adt > 1) {
            minusAdt.classList.remove('dtc-disable');
        } else {
            minusAdt.classList.add('dtc-disable');
        }

        if (adt > 8) {
            plusAdt.classList.add('dtc-disable');
            chd = 0;
        } else {
            plusAdt.classList.remove('dtc-disable');
        }

        if (chd < 9 - adt && chd < adt * 2) {
            plusChd.classList.remove('dtc-disable');
        }

        if (inf < adt && inf + chd < adt * 2) {
            plusInf.classList.remove('dtc-disable');
        }

        if (chd === 0) {
            minusChd.classList.add('dtc-disable');
        }

        if (inf === 0) {
            minusInf.classList.add('dtc-disable');
        }

        if (chd > 0) {
            minusChd.classList.remove('dtc-disable');
        }

        if (inf > 0) {
            minusInf.classList.remove('dtc-disable');
        }

        let text = `${adt} ${dtcCommon.getPaxName('ADT')}`;
        document.querySelector('[name="Adt"]').value = adt;
        if (chd > 0) {
            text += `, ${chd} ${dtcCommon.getPaxName('CHD')}`;
        }

        if (inf > 0) {
            text += `, ${inf} ${dtcCommon.getPaxName('INF')}`;
        }

        document.querySelector('[name="Chd"]').value = chd;
        document.querySelector('[name="Inf"]').value = inf;

        txtPax.innerHTML = text;
        document.getElementById('dtc-pax-number-mobile').value = text;
        document.getElementById('dtc-pax-number').value = text;
    }
    const searchAirportFun = function () {
        if (timeOutSearchAirport != null)
            clearTimeout(timeOutSearchAirport)

        timeOutSearchAirport = setTimeout(function () {
            const searchQuery = dtcCommon.removeVietnameseTones(document.getElementById('searchAirport').value)?.toLowerCase();

            const resultDiv = document.getElementById('resultSearchAirport');
            resultDiv.style.display = 'none';
            const tabSearchFixed = document.getElementById('tabSearchFixed');

            if (searchQuery && searchQuery.length > 1) {
                tabSearchFixed.style.display = 'none';

                let airports = dtcData.airports.map(s => {
                    const city = dtcData.cities.find(f => f.Code == s.CityCode);
                    s.CityName = city.Name;
                    s.CountryName = dtcData.countries.find(f => f.Code == city.CountryCode).Name;
                    return s;
                }).filter(s => dtcCommon.removeVietnameseTones(s.Code).toLowerCase().includes(searchQuery) ||
                    dtcCommon.removeVietnameseTones(s.CityCode).toLowerCase().includes(searchQuery) ||
                    dtcCommon.removeVietnameseTones(s.Name).toLowerCase().includes(searchQuery) ||
                    dtcCommon.removeVietnameseTones(s.CityName).toLowerCase().includes(searchQuery) ||
                    dtcCommon.removeVietnameseTones(s.CountryName).toLowerCase().includes(searchQuery));

                let html = '';

                airports.forEach(item => {
                    html += `<div class="dtc-flex dtc-justify-content-between dtc-cursor-pointer" data-value="${item.Code}" data-text="${item.CityName}(${item.Code})" onclick="dtcSearch.clickPoint(this)">
                                    <div>
                                        <div>${item.CityName}, ${item.CountryName}</div>
                                        <div class="dtc-note">${item.Name}</div>
                                    </div>
                                    <div class="dtc-muted">
                                        ${item.Code}
                                    </div>
                                </div>`
                })

                //const highlighted = html.replace(new RegExp(searchQuery, 'gi'), match => `<strong>${match}</strong>`);
                resultDiv.innerHTML = html;
                resultDiv.style.display = 'block';
            }
            else {
                tabSearchFixed.style.display = 'flex';
            }
        }, 500)
    }
    const hideSearchForm = function () {
        const searchForm = document.querySelector('#dtc-search-form');
        searchForm.classList.add('dtc-hide');
        setTimeout(function () {
            searchForm.querySelector('.dtc-search-header').classList.remove("dtc-show");
            searchForm.classList.remove('dtc-hide');
            searchForm.classList.remove("dtc-modal-show");
            document.querySelector('#dtc-search-form .dtc-search-option');
            document.querySelector('#dtcDisplaySearch').classList.remove('dtc-search-mobile-wrap');
        }, 300);
    }
    const hideMobileBar = function () {
        const filterMobile = document.querySelector('.dtc-filter-mobile');
        if (filterMobile) document.querySelector('.dtc-filter-mobile').style.display = "none";
    }
    const showMobileBar = function () {
        document.querySelector('.dtc-filter-mobile').style.display = "flex";
    }
    const toggleSearchForm = function () {
        const searchForm = document.querySelector('#dtc-search-form');
        if (!searchForm.classList.contains("dtc-modal-show")) {
            searchForm.classList.add("dtc-modal-show");
            document.querySelector('#dtc-search-form .dtc-search-option');
            document.querySelector('#dtcDisplaySearch').classList.add('dtc-search-mobile-wrap');
            searchForm.querySelector('.dtc-search-header').classList.add("dtc-show");
            dtcFilter.hideFilter();
            hideMobileBar();
            addHiddenBody();
        }
        else {
            hideSearchForm();
            showMobileBar();
            removeHiddenBody();
        }
    }
    return {
        init,
        addRoute,
        delRoute,
        changeItin,
        reserveRoute,
        focusInput,
        openTab,
        clickPoint,
        setValueSearch,
        changeNum,
        searchAirport: searchAirportFun,
        toggleSearchForm,
        hideSearchForm,
        hideMobileBar,
        showMobileBar,
        addHiddenBody,
        removeHiddenBody,
        closeRoute,
        convertDateFormat,
        clickInputMonth: function (inp) {
            setTimeout(function () {
                inputMonthTarget = inp;
                const dropdownMenu = dtcListMonth.querySelector('.dtc-dropdown-menu');
                dropdownMenu.style.width = inputMonthTarget.offsetWidth + 'px';
                const rect = inputMonthTarget.getBoundingClientRect();
                const rect2 = dtcListMonth.getBoundingClientRect();
                dropdownMenu.style.top = rect.bottom - rect2.top + 'px';
                dropdownMenu.style.left = rect.left - rect2.left + 'px';
                dropdownMenu.style.display = 'block'
            }, 111)
        },
        changeMonth: function (element) {
            inputMonthTarget.value = element.dataset.value;
            const dropdownMenu = dtcListMonth.querySelector('.dtc-dropdown-menu');
            dropdownMenu.style.display = 'none'
        },
        blurInputMonth: function () {
            setTimeout(function () {
                const dropdownMenu = dtcListMonth.querySelector('.dtc-dropdown-menu');
                dropdownMenu.style.display = 'none'
            }, 200)
        }
    }
}();
const dtcFilter = function () {
    let dataGroup;
    function formatTime(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    const updateRangeTrack = function (element1, element2) {
        const min = Number(element1.min);
        const max = Number(element1.max);
        const minValue = Number(element1.value);
        const maxValue = Number(element2.value);

        let percentageMin = ((minValue - min) / (max - min)) * 100;
        let percentageMax = ((maxValue - min) / (max - min)) * 100;

        const span = element1.parentElement.querySelector('span');

        if (percentageMin > percentageMax) {
            const temp = percentageMin;
            percentageMin = percentageMax;
            percentageMax = temp;
        }

        span.style.left = percentageMin + .5 + '%';
        span.style.width = percentageMax - percentageMin - 1 + '%';
    }
    const filterAirOption = function (data) {
        if (data) {
            dataGroup = JSON.parse(JSON.stringify(data));
        } else {
            data = JSON.parse(JSON.stringify(dataGroup));
        }

        data.forEach((group) => {
            group.ListAirOption = group.ListAirOption.filter(s => {
                const minAmount = Number(rangeMinAmount.value);
                const maxAmount = Number(rangeMaxAmount.value);
                let min = minAmount < maxAmount ? minAmount : maxAmount;
                let max = minAmount < maxAmount ? maxAmount : minAmount;

                txtMinAmount.innerHTML = dtcCommon.formatMoney(parseInt(min / 1000)) + 'k';
                txtMaxAmount.innerHTML = dtcCommon.formatMoney(parseInt(max / 1000)) + 'k';

                let arrFaceClass = [];

                if (!document.querySelector('.ckb-all[name="ckbFaceClass"]').checked) {
                    arrFaceClass = [...document.querySelectorAll('[name="ckbFaceClass"]:not(.ckb-all):checked')].map(m => {
                        return m.value;
                    });
                }
                s.ListFareOption = s.ListFareOption.filter(fareOption => fareOption.TotalFare >= min && fareOption.TotalFare <= max)

                if (arrFaceClass.length > 0)
                    s.ListFareOption = s.ListFareOption.filter(fareOption => arrFaceClass.includes(fareOption.FareFamily))

                if (s.ListFareOption.length == 0)
                    return false;

                const minTime = Number(rangeMinTime.value);
                const maxTime = Number(rangeMaxTime.value);
                min = minTime < maxTime ? minTime : maxTime;
                max = minTime < maxTime ? maxTime : minTime;

                txtMinTime.innerHTML = formatTime(min);
                txtMaxTime.innerHTML = formatTime(max);

                const flight = s.ListFlightOption[0].ListFlight[0];
                const time = new Date(flight.StartDate);
                const m = time.getHours() * 60 + time.getMinutes();

                if (m < min || m > max)
                    return false;

                if (!document.querySelector('.ckb-all[name="ckbAirline"]').checked) {
                    const arr = [...document.querySelectorAll('[name="ckbAirline"]:not(.ckb-all):not(:checked)')].map(m => {
                        return m.value;
                    });

                    if (arr.indexOf(s.Airline) > -1)
                        return false;
                }

                if (!document.querySelector('.ckb-all[name="ckbStopNum"]').checked) {
                    if (!document.querySelector('[name="ckbStopNum"][value="0"]').checked && flight.StopNum === 0)
                        return false;
                    if (!document.querySelector('[name="ckbStopNum"][value="1"]').checked && flight.StopNum === 1)
                        return false;
                    if (!document.querySelector('[name="ckbStopNum"][value="2"]').checked && flight.StopNum > 1)
                        return false;
                }

                let arr = [...document.querySelectorAll('.dtc-time-start:not(.dtc-checked)')];

                const day = new Date(flight.StartDate);
                const dayStr = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();

                for (let i = 0; i < arr.length; i++) {
                    let item = arr[i];
                    min = +new Date(dayStr + ' ' + item.dataset.min);
                    max = +new Date(dayStr + ' ' + item.dataset.max);
                    if (min <= time && time <= max)
                        return false;
                }

                return true;
            });

            group.ListAirOption.sort((a, b) => {
                const fareOptionA = dtcCommon.getMinFareOption(a.ListFareOption);
                const fareOptionB = dtcCommon.getMinFareOption(b.ListFareOption);
                const flightA = a.ListFlightOption[0].ListFlight[0];
                const flightB = b.ListFlightOption[0].ListFlight[0];

                const sort = document.querySelector(`[data-journey="${flightA.StartPoint + flightA.EndPoint + flightA.DepartDate.split(' ')[0]}"] .dtc-sort.dtc-checked`);

                if (sort) {
                    const val = sort.dataset.value;
                    const desc = sort.classList.contains('dtc-sort-desc');

                    let res = 0;

                    switch (val) {
                        case '1':
                            {
                                const timeA = +new Date(flightA.StartDate);
                                const timeB = +new Date(flightB.StartDate);

                                if (timeA !== timeB)
                                    res = timeA > timeB ? -1 : 1;
                            }
                            break;
                        case '2':
                            {
                                const timeA = +new Date(flightA.EndDate);
                                const timeB = +new Date(flightB.EndDate);

                                if (timeA !== timeB)
                                    res = timeA > timeB ? -1 : 1;
                            }
                            break;
                        case '3':
                            if (flightA.Duration !== flightB.Duration)
                                res = flightA.Duration > flightB.Duration ? -1 : 1;
                            break;
                        case '4':
                            if (a.Airline !== b.Airline)
                                res = a.Airline > b.Airline ? -1 : 1;
                            break;
                        default:
                            if (fareOptionA.TotalFare !== fareOptionB.TotalFare)
                                res = fareOptionA.TotalFare > fareOptionB.TotalFare ? -1 : 1;
                            break;
                    }

                    if (res === 0)
                        return fareOptionA.TotalFare < fareOptionB.TotalFare ? -1 : 1;

                    return desc ? res : -1 * res;
                }
                return 0;
            });
        });
        dtcPlugin.showQuoteFlightHtml(data);
        return dtcPlugin.showFlightHtml(data);
    }
    const prinftFilter = function (options) {
        let directOnly = true;

        const arr = [];

        options.listGroup.forEach(s => {
            arr.push(...s.split('_'))
        })

        arr.forEach(s => {
            const startPoint = s.substr(0, 3);
            const endPoint = s.substr(3, 3);
            if (!dtcCommon.checkDomestic(startPoint, endPoint) || startPoint == "PQC" || endPoint == "PQC" || startPoint == "VCS" || endPoint == "VCS")
                directOnly = false;
        })

        dtcCommon.getView(dtcDisplayFilter, dtcRequestViewUrl.Filter + '?directOnly=' + directOnly, function () {
            rangeMinAmount.min = options.rangeMinAmount;
            rangeMinAmount.max = options.rangeMaxAmount;
            rangeMinAmount.value = options.rangeMinAmount;
            rangeMaxAmount.min = options.rangeMinAmount;
            rangeMaxAmount.max = options.rangeMaxAmount;
            rangeMaxAmount.value = options.rangeMaxAmount;

            rangeMinTime.min = options.rangeMinTime;
            rangeMinTime.max = options.rangeMaxTime;
            rangeMinTime.value = options.rangeMinTime;
            rangeMaxTime.min = options.rangeMinTime;
            rangeMaxTime.max = options.rangeMaxTime;
            rangeMaxTime.value = options.rangeMaxTime;
            if (options.listFaceClass.some(s => s.FareFamily)) {
                dtcCommon.mapDataToView({
                    ListAirline: options.listAirline.map((s, i) => ({
                        Name: dtcCommon.getAirline(s.Airline)?.Name,
                        Airline: s.Airline,
                        TotalFare: dtcCommon.formatMoney(s.TotalFare),
                        Index: i
                    })),
                    ListFareFamily: options.listFaceClass
                        .filter(s => s.FareFamily)
                        .map((s, i) => ({
                            FareFamily: s.FareFamily,
                            TotalFare: dtcCommon.formatMoney(s.TotalFare),
                            Index: i
                        }))
                }, dtcDisplayFilter);
            }
            rangeMinAmount.addEventListener('change', function () { filterAirOption() });
            rangeMaxAmount.addEventListener('change', function () { filterAirOption() });

            document.querySelectorAll('.filter-group input').forEach(item => {
                const gr = item.closest('.filter-group');
                if (item.classList.contains('ckb-all')) {
                    item.addEventListener('click',
                        function () {
                            gr.querySelectorAll('input').forEach(item2 => {
                                item2.checked = this.checked;
                            });

                            filterAirOption();
                        });
                } else {
                    item.addEventListener('click',
                        function () {
                            if (!this.checked)
                                gr.querySelector('.ckb-all').checked = false;
                            else if (gr.querySelectorAll('input:not(.ckb-all):not(:checked)').length === 0)
                                gr.querySelector('.ckb-all').checked = true;

                            filterAirOption();
                        });
                }
            });

            document.querySelectorAll('.dtc-time-start').forEach(item => {
                item.addEventListener('click',
                    function () {
                        item.classList.toggle('dtc-checked');
                        filterAirOption();
                    });
            });

            document.querySelectorAll('[name="radioDisplay"]').forEach(item => {
                item.addEventListener('click',
                    function () {
                        filterAirOption();
                    });
            });

            rangeMinAmount.addEventListener('input', function () {
                updateRangeTrack(rangeMinAmount, rangeMaxAmount);
            });

            rangeMaxAmount.addEventListener('input', function () {
                updateRangeTrack(rangeMinAmount, rangeMaxAmount);
            });

            rangeMinTime.addEventListener('input', function () {
                updateRangeTrack(rangeMinTime, rangeMaxTime);
            });

            rangeMaxTime.addEventListener('input', function () {
                updateRangeTrack(rangeMinTime, rangeMaxTime);
            });

            dtcCommon.initDropdown();
        });
    }
    const hideFilter = function () {
        const filter = document.getElementById('dtcDisplayFilter');
        filter.classList.add('dtc-hide');
        setTimeout(function () {
            filter.classList.remove('dtc-hide');
            filter.classList.remove('dtc-display-filter');
            filter.classList.remove("dtc-modal-show");
        }, 300);
    }
    const toggleFilter = function () {
        const filter = document.getElementById('dtcDisplayFilter');
        if (!filter.classList.contains("dtc-modal-show")) {
            dtcSearch.hideSearchForm();
            filter.classList.add("dtc-display-filter");
            filter.classList.add("dtc-modal-show");
            dtcSearch.hideMobileBar();
            dtcSearch.addHiddenBody();
        }
        else {
            hideFilter();
            dtcSearch.showMobileBar();
            dtcSearch.removeHiddenBody();
        }
    }
    const filterOnly = function (element) {
        const inp = element.parentElement.querySelector('input');
        [...element.closest('.filter-group').querySelectorAll('input')].forEach(s => {
            s.checked = false;
        });

        inp.click();
    }
    const download = function (element) {
        const type = element.getAttribute("data-type");
        const exportPreview = document.getElementById("QuoteWrap");

        if (exportPreview) {
            if (type === "PNG") {
                const btn = document.querySelector('.dtc-exe-download');
                dtcCommon.showBtnLoader(btn);
                const scale = 3;

                htmlToImage
                    .toPng(exportPreview, {
                        width: exportPreview.offsetWidth * scale,
                        height: exportPreview.offsetHeight * scale,
                        style: {
                            transform: 'scale(' + scale + ')',
                            transformOrigin: 'top left',
                            width: exportPreview.offsetWidth + 'px',
                            height: exportPreview.offsetHeight + 'px',
                        },
                    })
                    .then((dataUrl) => {
                        var link = document.createElement('a');
                        link.download = `bao-gia-hanh-trinh.png`;
                        link.href = dataUrl;
                        link.click();
                        dtcCommon.hideBtnLoader(btn);
                    });
            }
            else if (type === "TXT") {
                let html = "";
                const groups = exportPreview.querySelectorAll('.dtc-option-group');
                if (groups && groups.length > 0) {
                    groups.forEach(element => {
                        html += element.dataset.group + '\n';
                        html += element.dataset.date + '\n';

                        element.querySelector('.dtc-export-table').querySelectorAll('tr').forEach(tr => {
                            const tds = tr.querySelectorAll('td');
                            tds.forEach((td, i) => {
                                if (td.querySelector("div")) {
                                    html += td.querySelector("div").innerText + '\n';
                                }
                                else {
                                    html += td.innerText + '\t';
                                    if (i === (tds.length - 1)) {
                                        html += "\n";
                                    }
                                }
                            })
                        });
                        html += "\n";
                    });
                }

                const blob = new Blob([html], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "bao-gia-hanh-trinh.txt";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                //navigator.clipboard.writeText(html)
                //    .then(() => {
                //        const div = document.createElement("div");
                //        div.textContent = "Sao chép vào bộ nhớ tạm thành công !";
                //        div.className = "dtc-copy-toast";
                //        document.body.appendChild(div);

                //        setTimeout(() => {
                //            const toasts = document.querySelectorAll('.dtc-copy-toast');
                //            toasts.forEach(e => {
                //                e.remove();
                //            })
                //        }, 1500)
                //    })
                //    .catch((err) => {
                //        console.error("Failed to copy text: ", err);
                //    });
            }
        }
    }
    const printQuotation = function (type) {
        document.querySelector('.dtc-exe-download').setAttribute('data-type', type);
        document.querySelector('#dtcQuoteDowload .dtc-modal-header').style.display = 'block';
        document.querySelector('#dtcQuoteDowload .dtc-modal-body').innerHTML = '<div id="dtcQuote"><div id="QuoteWrap"></div></div>';
        dtcPlugin.printQuoteData();
        document.getElementById('dtcQuoteDowload').classList.add('dtc-show');
    }
    return {
        prinftFilter,
        filterAirOption,
        filterOnly,
        toggleFilter,
        hideFilter,
        printQuotation,
        download,
        reset: function () {
            setTimeout(() => { filterAirOption() }, 100);
            [...document.querySelectorAll('.dtc-range-slider span')].forEach(item => {
                item.style.removeProperty('left');
                item.style.removeProperty('width');
            })
        }
    }
}();
const dtcFlight = function () {
    let listSelectd = [];
    const changeFareOption = function (div, optionId, totalFare) {
        const airOption = div.closest('.dtc-air-option');
        airOption.setAttribute('data-fare-option', optionId);
        airOption.querySelector('button.dtc-total-fare b').innerHTML = dtcCommon.formatMoney(totalFare);

        if (div.classList.contains('dtc-active')) return;
        div.parentElement.querySelector('.dtc-active').classList.remove('dtc-active');
        div.classList.add('dtc-active');
        airOption.querySelector('[name="selectFlight"]').focus();
    }
    const viewDetailFare = function (fare, optionId) {
        const modal = document.getElementById('dtc-modal');
        const modalBody = modal.querySelector('.dtc-modal-body');
        const collapse = fare.closest('.dtc-collapse');
        const airRow = fare.closest('.dtc-air-row')
        const airOption = airRow.querySelector('.dtc-air-option');
        const fareOption = dtcPlugin.getFareOption(airOption.dataset.session,
            airOption.closest('.dtc-option-group')?.dataset.journey || airOption.dataset.journey,
            airOption.dataset.airOption,
            optionId,
            airOption.dataset.verifyIndex);

        dtcCommon.getView(modalBody, dtcRequestUrl.Modal.ModalDetailFare, () => {
            const id = dtcCommon.makeid(8);

            dtcCommon.mapDataToView({
                ListFarePax: fareOption.ListFarePax.map((s, i) => {
                    s.DtcActive = i === 0 ? 'dtc-active' : '';
                    s.TabIndex = id + i;
                    s.PaxName = dtcCommon.getPaxName(s.PaxType);

                    const tf = s.ListFareItem.find(f => f.Code === 'TICKET_FARE')?.Amount || 0;
                    s.TICKET_FARE = dtcCommon.formatMoney(tf);
                    s.TICKET_TAX = dtcCommon.formatMoney(s.TotalFare - tf);
                    s.TotalFare = dtcCommon.formatMoney(s.TotalFare);
                    return s;
                }),
                CabinName: fareOption.CabinName,
                FareFamily: fareOption.FareFamily,
                Currency: fareOption.Currency,
                TotalFare: dtcCommon.formatMoney(fareOption.TotalFare),
                Refundable: fareOption.Refundable ? 'Được hoàn vé' : 'Theo điều kiện'
            }, modalBody);

            modal.classList.add('dtc-show');
        });
    }
    const selectFlightFare = function (element) {
        const viewport = document.getElementById("dtcDisplayFlights").getBoundingClientRect();
        const dropFare = element.querySelector('.dtc-list-fare-option');
        element.classList.toggle("dtc-show");

        const dropFarePosition = dropFare.getBoundingClientRect();
        if ((dropFarePosition.bottom + dropFarePosition.height) > viewport.bottom) {
            element.classList.add('dropup');
        }
    }
    const selectFlight = function (airOption) {
        const session = airOption.dataset.session;
        const $airOption = airOption.dataset.airOption;
        const flightOption = airOption.dataset.flightOption;
        const fareOption = airOption.dataset.fareOption;
        const system = airOption.dataset.system;
        const airline = airOption.dataset.airline;
        const optionGroup = airOption.closest('.dtc-option-group');
        const tripType = optionGroup.dataset.tripType;

        optionGroup.classList.add('dtc-selected');
        const divs = [...document.querySelectorAll('.dtc-option-group.dtc-selected')];
        const index = Array.prototype.indexOf.call(divs, optionGroup);

        if (tripType === 'OW')
            listSelectd.splice(index, 0, {
                Session: session,
                AirlineOptionId: $airOption,
                FareOptionId: fareOption,
                FlightOptionId: flightOption,
                System: system,
                Airline: airline,
                Journey: optionGroup.dataset.journey,
                TripType: tripType
            });
        else {
            listSelectd = [];
            listSelectd.push({
                Session: session,
                AirlineOptionId: $airOption,
                FareOptionId: fareOption,
                FlightOptionId: flightOption,
                System: system,
                Airline: airline,
                Journey: optionGroup.dataset.journey,
                TripType: tripType
            });
        }

        dtcPlugin.showPassenger();
    }
    const selectFlight2 = function (div) {
        const fareOption = div.closest('.dtc-fare-option');
        const airRow = fareOption.closest('.dtc-air-row')
        const airOption = airRow.querySelector('.dtc-air-option');
        airOption.setAttribute('data-fare-option', fareOption.dataset.optionId);
        selectFlight(airOption);
    }
    const unselectFlight = function (element) {
        if (element.dataset.journey.indexOf('_') > -1) {
            const mcElement = document.querySelector(`.dtc-option-group[data-journey="${element.dataset.journey}"]`);
            if (mcElement) {
                mcElement.classList.remove('dtc-selected');
                const index = listSelectd.findIndex(s => s.Journey === mcElement);
                listSelectd.splice(index, 1);
                dtcPlugin.showPassenger();
            }


            [...element.dataset.journey.split('_')].forEach(item => {
                const ele = document.querySelector(`.dtc-option-group[data-journey="${item}"]`);

                if (ele) {
                    ele.classList.remove('dtc-selected');
                    const index = listSelectd.findIndex(s => s.Journey === item);
                    listSelectd.splice(index, 1);
                    dtcPlugin.showPassenger();
                }
            })
        }
        else {
            const ele = document.querySelector(`.dtc-option-group[data-journey="${element.dataset.journey}"]`);

            if (ele) {
                ele.classList.remove('dtc-selected');
                const index = listSelectd.findIndex(s => s.Journey === element.dataset.journey);
                listSelectd.splice(index, 1);
                dtcPlugin.showPassenger();
            }
        }
        dtcCommon.initDropdown();
    }
    const delSelectd = function () {
        [...document.querySelectorAll('.dtc-option-group.dtc-selected')].forEach(item => {
            item.classList.remove('dtc-selected');
        });
        listSelectd = [];
        dListSelectFlight.innerHTML = '';
        dSelectFlight.style.display = 'none';
    }
    const getSelected = function () {
        return listSelectd;
    }
    return {
        getSelected,
        selectFlight,
        selectFlight2,
        selectFlightFare,
        unselectFlight,
        delSelectd,
        changeFareOption,
        viewDetailFare,
        changeDocumentType: function (element) {
            const documentExpiry = element.parentElement.querySelector('[name="DocumentExpiry"]');
            if (element.value === 'passport') {
                documentExpiry.placeholder = 'Ngày hết hạn *';
                documentExpiry.required = true;
            }
            else {
                documentExpiry.placeholder = 'Ngày hết hạn';
                documentExpiry.required = false;
            }
        }
    }
}();
const dtcBook = function () {
    let listFlightFare;
    let listPassenger;
    let dataSeat;
    let contact;
    const listBaggage = [];
    const listService = [];
    let rqService;
    let numSelectSeat = 1;

    const getPrefix = function (paxType, gender) {
        if (paxType === "ADT") {
            return (gender === "1") ? "MR" : "MS"
        }
        else if (paxType === "CHD" || paxType === "INF") {
            return (gender === "1") ? "MSTR" : "MISS"
        }
    }
    const init = function (data) {
        listFlightFare = data;
        listPassenger = [];
    }
    const getValueByName = function (elements) {
        const data = {};
        [...elements].forEach(item => {
            if (item.name && item.value) {
                data[item.name] = item.value;
            }
        });
        return data;
    }
    const nextToService = function (rq) {
        if (!listPassenger || listPassenger.length === 0)
            listPassenger = [...document.querySelectorAll('.dtc-list-pax .dtc-pax')].map(item => {
                const passenger = getValueByName(item.querySelectorAll('.dtc-group-input [name]'));
                passenger.Passport = getValueByName(item.querySelectorAll('.dtc-passport [name]'));
                passenger.ListMembership = [...item.querySelectorAll('.dtc-loyality input')].map(m => {
                    return {
                        Airline: m.dataset.airline,
                        MembershipID: m.value
                    }
                });
                passenger.Title = getPrefix(passenger.Type, passenger.Gender);
                return passenger;
            });

        if (rq)
            rqService = rq.map(s => {
                return {
                    System: s.System,
                    SessionInfo: {
                        Session: s.Session,

                        AirlineOptionId: s.AirlineOptionId,
                        FareOptionId: s.FareOptionId,
                        FlightOptionId: s.FlightOptionId
                    }
                }
            });
    }
    const updateNameService = function (data) {
        listBaggage.length = 0;
        listService.length = 0;
        data.forEach(item => {
            listBaggage.push(...item.ListBaggage);
            listService.push(...item.ListService);
        });
    }
    const updateSeatPassenger = function (data) {
        if (data)
            dataSeat = data;

        [...dSeatMap.querySelectorAll('.dtc-seat-passenger .dtc-seat-selected.list-group')].forEach(item => {
            item.innerHTML = '';
            const session = item.closest('.dtc-seat-passenger').dataset.session;
            let price = 0;

            listPassenger.filter(s => s.Type !== 'INF').forEach(passenger => {
                const div = document.createElement('DIV');
                div.className = 'dtc-list-group-item dtc-seat-pax-row dtc-mb-2';
                div.setAttribute('data-index', passenger.Index);
                const seat = passenger.ListPreSeat?.find(s => s.Session === session);
                if (seat) {
                    price += seat.Price;
                    div.innerHTML = `<div class="dtc-flex dtc-align-item-center dtc-justify-content-between">
                                         <div class="dtc-flex dtc-align-item-center">
                                             <div class="dtc-seat-pax-select${seat.Location.indexOf('ExitRowSeat') > -1 ? ' exitrowseat' : ''}">
                                                 <span class="dtc-seat-item" data-selected="no">${seat.Code}</span>
                                             </div>
                                             <div class="dtc-seat-pax-name dtc-ms-2 dtc-pax-name dtc-text-ellipsis">${passenger.FullName}</div>
                                         </div>
                                         <div class="dtc-seat-pax-price dtc-price-cl">
                                             ${dtcCommon.formatMoney(seat.Price)}
                                         </div>
                                     </div>`;
                } else {
                    div.innerHTML = `<div class="dtc-flex dtc-align-item-center dtc-justify-content-between">
                                         <div class="dtc-flex dtc-align-item-center">
                                             <div class="dtc-seat-pax-select" data-index="${passenger.Index}" >
                                                 <span class="dtc-seat-item dtc-empty" data-selected="no"></span>
                                             </div>
                                             <div class="dtc-seat-pax-name dtc-ms-2 dtc-pax-name dtc-text-ellipsis">${passenger.FullName}</div>
                                         </div>
                                         <div class="dtc-seat-pax-price dtc-price-cl">
                                             0
                                         </div>
                                     </div>`;
                }
                item.appendChild(div);
            });

            item.parentElement.querySelector('strong.dtc-total-seat-price').innerHTML = dtcCommon.formatMoney(price);
        });
    }
    const unSelectSeat = function (index, session) {
        listPassenger.find(s => s.Index === index).ListPreSeat.splice(listPassenger.find(s => s.Index === index).ListPreSeat.map(s => s.Session).indexOf(session), 1);
    }
    const selectSeat = function (element) {
        const session = element.dataset.session;
        const rowIndex = element.dataset.row;
        const value = element.dataset.value;

        if (element.classList.contains('dtc-selected')) {
            element.classList.remove('dtc-selected');
            element.removeAttribute('data-index');
            unSelectSeat(element.querySelector('span').innerHTML, session);
            updateSeatPassenger();
            showPaxCart();
            numSelectSeat = 1;
        } else {
            const seatPassenger = document.querySelector(`.dtc-seat-passenger[data-session="${session}"]`);
            const empty = seatPassenger.querySelector('.dtc-seat-item.dtc-empty');
            let index;

            if (!empty) {
                const s = element.closest('.dtc-seat-plane').querySelector('[data-index="' + numSelectSeat + '"]');
                s.classList.remove('dtc-selected');
                s.removeAttribute('data-index');
                index = '' + numSelectSeat;
                unSelectSeat(index, session);
                numSelectSeat++;
                if (numSelectSeat > listPassenger.length) numSelectSeat = 1;
            }
            else {
                index = empty.parentElement.dataset.index
            }

            element.classList.add('dtc-selected');
            element.querySelector('span').innerHTML = index;
            element.setAttribute('data-index', index);

            let seatMap;
            let seat;

            dataSeat.forEach(item => {
                if (seatMap == null) {
                    const sm = item.ListSeatMap.find(s => s.Session === session);
                    if (sm)
                        seatMap = sm;
                }
            });

            seatMap.ListCabin.forEach(item => {
                if (seat == null) {
                    const r = item.ListRow.find(s => s.RowNumber === rowIndex);
                    if (r) seat = r.ListSeat.find(se => se.SeatNumber === value);
                }
            });

            const passenger = listPassenger.find(s => s.Index === index);

            if (!passenger.ListPreSeat)
                passenger.ListPreSeat = [];


            const listFlight = [];
            listFlightFare.forEach(s => {
                listFlight.push(...s.ListFlight)
            });
            passenger.ListPreSeat.push({
                Airline: seatMap.Airline,
                Code: seat.SeatNumber,
                Confirmed: false,
                Currency: seat.Currency,
                StartPoint: seatMap.StartPoint,
                EndPoint: seatMap.EndPoint,
                Leg: listFlight.find(s => s.StartPoint === seatMap.StartPoint).Leg,
                Name: seat.SeatNumber,
                Price: seat.Price,
                Session: seatMap.Session,
                Value: seat.SeatNumber,
                Location: seat.Location
            });
            passenger.ListPreSeat.sort((a, b) => a.Leg - b.Leg);
            updateSeatPassenger();
            showPaxCart();
        }

    }
    const selectBaggage = function () {
        setTimeout(function () {
            listPassenger.forEach(item => {
                item.ListBaggage = [];

                [...document.querySelectorAll(`[data-name-passenger="${item.Index}"] input[type="radio"]:checked`)].forEach(ele => {
                    const span = ele.closest('.dtc-baggage').querySelector(`.dtc-baggage-head span`);

                    if (ele.value) {
                        const session = ele.dataset.session;
                        const baggage = listBaggage.find(s => s.Value === ele.value && s.Session === session);
                        item.ListBaggage.push(baggage);

                        span.innerHTML = `<span style="display: flex;justify-content: space-between">
                                              <span>${baggage.Name}</span>
                                              <div class="dtc-price-cl">${dtcCommon.formatMoney(baggage.Price)} <span class="dtc-neu3-cl">${baggage.Currency}</span></div>
                                          </span>`;
                    } else {
                        span.innerHTML = 'Chọn gói hành lý';
                    }
                });
            });
            showPaxCart();
        }, 100);
    }
    const selectService = function () {
        setTimeout(function () {
            listPassenger.forEach(item => {
                item.ListService = [];
                const list = document.querySelectorAll(`.dtc-service-body .dtc-form-check-input[data-index="${item.Index}"]:checked`);
                [...list].forEach(element => {
                    if (element.value) {
                        const session = element.dataset.session;
                        const service = listService.find(s => s.Value === element.dataset.value && s.Session === session && (!s.PaxType || s.PaxType === element.dataset.paxtype));
                        item.ListService.push(service);
                    }
                });
            });

            [...document.querySelectorAll('.dtc-service')].forEach(item => {
                const span = item.querySelector('button span');
                const list = item.querySelectorAll(`.dtc-service-body .dtc-form-check-input:checked`);

                if (list.length === 0) {
                    span.innerHTML = 'Chọn gói dịch vụ';
                } else {
                    const price = [...list].map(s => Number(s.dataset.price)).reduce((a, b) => a + b, 0);
                    span.innerHTML = '<div class="dtc-flex dtc-justify-between">' + list.length + 'x dịch vụ' + `<span class="dtc-price-cl">${dtcCommon.formatMoney(price)} <span class="dtc-neu3-cl">VND</span></span></div>`;
                }
            });
            showPaxCart();
        }, 100);
    }
    const getDate = function (date) {
        let newDate = null;
        if (!date) {
            return "";
        }
        else if (date instanceof Date && !isNaN(date)) {
            newDate = date;
        } else {
            newDate = new Date(date);
        }
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return day + '/' + month + '/' + year;
    }
    const getTime = function (date) {
        let newDate = null;
        if (!date) {
            return "";
        }
        else if (date instanceof Date && !isNaN(date)) {
            newDate = date;
        } else {
            newDate = new Date(date);
        }
        let hours = newDate.getHours();
        let minutes = newDate.getMinutes();

        // Đảm bảo giờ và phút luôn có 2 chữ số
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        return hours + ':' + minutes;
    }
    const showLoaderModal = function () {
        const modal = document.querySelector('#dtc-modal');
        const modalBody = modal.querySelector(".dtc-modal-body");
        modalBody.innerHTML = `<div class="dtc-loading-book"><div style="text-align: center">
            <h3 class="dtc-pri-cl">Chúng tôi đang tiến hành giữ chỗ cho bạn</h3>
            <div style="display: flex; justify-content: center; padding: 1rem;"><img src="${dtcBaseUrl}img/confirm-loading.gif" style="max-width: 200px;" /></div>
            <div class="dtc-mt-3 dtc-mb-1 dtc-dark-cl">Quý khách đợi trong giây lát.</div>
            <div class="dtc-dark-cl">Hệ thống đang xử lý, vui lòng không tắt trình duyệt hoặc màn hình.</div>
        </div></div>`;
        modal.querySelector(".dtc-btn-modal-close").style.display = "none";
        modal.classList.add('dtc-show');
    }
    const hideLoaderModal = function () {
        const modal = document.querySelector('#dtc-modal');
        modal.querySelector(".dtc-btn-modal-close").style.display = "";
        modal.querySelector(".dtc-btn-modal-close").click();
    }
    const showConfirm = function () {
        let invalid = true;
        const form = document.getElementById('dtc-form-invoice');
        if (ckbUseInvoice.checked) {
            if (dtcCommon.checkValidityForm(form)) {
                form.classList.add('dtc-invalid');

                const firstInvalidField = form.querySelector(":invalid");
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
                    firstInvalidField.focus();
                }
                invalid = false;
            }
        }
        else {
            form.classList.remove('dtc-invalid');
        }

        const inputInvalid = formInputPassenger.querySelector('*:invalid') || formInputPassenger.querySelector('input[required]:placeholder-shown');

        if (inputInvalid) {
            formInputPassenger.classList.add('dtc-invalid');
            if (inputInvalid) {
                inputInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
                inputInvalid.focus();
            }
            invalid = false;
        } else {
            formInputPassenger.classList.remove('dtc-invalid');
        }
        if (!invalid) {
            console.log("Form invalid -> không hiển thị modal");
            // return;
        }
         if (!invalid) return;

        dtcBook.changeNamePassenger();
        const modal = document.getElementById('dtcConfirmBook');
        const modalBody = modal.querySelector('.dtc-modal-body');
        let html = "<div class='dtc-confirm-wrap'>";

        let totalPrice = listFlightFare.map(n => n.FareInfo ? n.FareInfo.TotalFare : 0).reduce((total, currentValue) => {
            return total + currentValue;
        }, 0);
        // in passengers

        html += `<button type="button" class="dtc-btn dtc-btn-confirm-close" data-dismiss="modal" aria-label="Close"></button>`;
        html += `<div class="dtc-confirm-content">`;
        html += `<div class='dtc-confirm-title'>PASSENGERS</div>`;
        if (listPassenger && listPassenger.length > 0) {
            html += "<table class='dtc-confirm-table'>";
            listPassenger.forEach(passenger => {
                html += `<tr>
                    <td>${passenger.Index}.</td>
                    <td>${passenger.Surname}/${passenger.GivenName}</td>
                    <td class='dtc-sys-yellow-cl'>${passenger.Title}</td>
                    <td>${passenger.DateOfBirth || ""}</td>
                </tr>`;
            });
            html += "</table>";
        }
        // in flights
        if (listFlightFare && listFlightFare.length > 0) {
            html += "<div class='dtc-confirm-title'>FLIGHTS</div>";
            html += "<table class='dtc-confirm-table'>";
            let flightIndex = 0;
            listFlightFare.forEach(flightFare => {
                flightFare.ListFlight.forEach(flight => {
                    flight.ListSegment.forEach((segment, i) => {
                        const segmentFares = flightFare.FareInfo.ListFarePax.length > 0 && flightFare.FareInfo.ListFarePax[0].ListFareInfo.length > 0 ? flightFare.FareInfo.ListFarePax[0].ListFareInfo : [];
                        if (segmentFares.length > 0) {
                            const segmentFare = segmentFares.find(n => n.StartPoint == segment.StartPoint && n.EndPoint == segment.EndPoint);
                            if (segmentFare) {
                                html += `<tr>
                                    <td>${flightIndex + 1}.</td>
                                    <td>${segment.Airline + segment.FlightNumber}</td>
                                    <td class='dtc-sys-blue-cl'>${segment.StartPoint + segment.EndPoint}</td>
                                    <td>${getDate(segment.StartDate)}</td>
                                    <td>${getTime(segment.StartDate)}</td>
                                    <td>${getTime(segment.EndDate)}</td>
                                    <td class='dtc-sys-yellow-cl'>${segmentFare.FareClass}</td>
                                </tr>`;
                                flightIndex++;
                            }
                        }

                    });
                });
                //html += `<tr>
                //    <td class="dtc-dot-under"></td>
                //    <td class="dtc-dot-under"></td>
                //    <td class="dtc-dot-under"></td>
                //    <td class="dtc-dot-under"></td>
                //    <td class="dtc-dot-under"></td>
                //    <td class="dtc-dot-under"></td>
                //    <td>${dtcCommon.formatMoney(flightFare.FareInfo.TotalFare)}</td>
                //</tr>`;
            })
            html += "</table>";
        }
        if (listPassenger && listPassenger.length > 0) {
            if (listPassenger.flatMap(n => n.ListBaggage || []).length > 0) {
                html += "<div class='dtc-confirm-title'>BAGGAGE</div>";
                html += "<table class='dtc-confirm-table'>";
                listPassenger.forEach(passenger => {
                    // in bagggage
                    if (passenger.ListBaggage && passenger.ListBaggage.length > 0) {
                        passenger.ListBaggage.forEach((baggage, index) => {
                            html += `<tr>
                            <td>${index + 1}.</td>
                            <td>${passenger.Surname}/${passenger.GivenName}</td>
                            <td class='dtc-sys-blue-cl'>${baggage.Airline}</td>
                            <td class='dtc-sys-blue-cl'>${baggage.StartPoint + baggage.EndPoint}</td>
                            <td class='dtc-sys-yellow-cl'>${baggage.Name}</td>
                        </tr>`;
                            totalPrice += baggage.Price;
                        });
                    }
                });
                html += "</table>";
            }

            if (listPassenger.flatMap(n => n.ListPreSeat || []).length > 0) {
                html += "<div class='dtc-confirm-title'>PRESEAT</div>";
                html += "<table class='dtc-confirm-table'>";
                listPassenger.forEach(passenger => {
                    // in preseat
                    if (passenger.ListPreSeat && passenger.ListPreSeat.length > 0) {
                        passenger.ListPreSeat.forEach((preseat, index) => {
                            html += `<tr>
                            <td>${index + 1}.</td>
                            <td>${passenger.Surname}/${passenger.GivenName}</td>
                            <td class='dtc-sys-blue-cl'>${preseat.StartPoint + preseat.EndPoint}</td>
                            <td class='dtc-sys-yellow-cl'>${preseat.Name}</td>
                        </tr>`;
                            totalPrice += preseat.Price;
                        });
                    }
                });
                html += "</table>";
            }

            if (listPassenger.flatMap(n => n.ListService || []).length > 0) {
                html += "<div class='dtc-confirm-title'>SERVICES</div>";
                html += "<table class='dtc-confirm-table'>";
                listPassenger.forEach(passenger => {
                    // in service
                    if (passenger.ListService && passenger.ListService.length > 0) {
                        passenger.ListService.forEach((service, index) => {
                            html += `<tr>
                            <td>${index + 1}.</td>
                            <td>${passenger.Surname}/${passenger.GivenName}</td>
                            <td class='dtc-sys-blue-cl'>${service.Airline}</td>
                            <td class='dtc-sys-blue-cl'>${service.StartPoint + service.EndPoint}</td>
                            <td class='dtc-sys-yellow-cl'>${service.Name}</td>
                        </tr>`;
                            totalPrice += service.Price;
                        });
                    }
                });
                html += "</table>";
            }

            contact = getValueByName(document.querySelectorAll('.dtc-contact [name]'));
            if (contact) {
                html += "<div class='dtc-confirm-title'>CONTACT</div>";
                html += "<table class='dtc-confirm-table'>";
                html += `<tr><td>Phone: ${contact.Phone}</td></tr>`;
                html += `<tr><td>Email: ${contact.Email}</td></tr>`;
                html += "</table>";
            }
        }

        const currency = listFlightFare.length > 0 && listFlightFare[0].FareInfo ? listFlightFare[0].FareInfo.Currency : "VND";
        html += `<div class="dtc-confirm-total">
                    <div>TOTAL PRICE (${currency})</div>
                    <div class="dtc-confirm-line"></div>
                    <div>${dtcCommon.formatMoney(totalPrice)}</div>
                </div>`;
        modalBody.innerHTML = html += "</div></div>";
        modal.querySelector('.dtc-modal-header').style.display = 'block';
        modal.classList.add('dtc-show');
    }
    /// custome
    const getValueFromPriceBlock = (container) => {
        const divs = container.querySelectorAll('div');
        const currencyText = divs[0]?.innerText ?? ''; 
        const amountText = divs[2]?.innerText ?? '0'; 
        const amount = parseInt(amountText.replace(/,/g, ''), 10);
        const match = currencyText.match(/\((.*?)\)/);
        const currency = match ? match[1] : '';

        return {
            amount,
            currency
        };
    };
   



const bookFlight = function (element) {
    const errorModal = document.querySelector('#dtcBookError');
    if (errorModal) {
        errorModal.classList.remove('dtc-show');
    }

    // Tính toán dữ liệu chi tiết tương tự như trong showDetail
    const listFare = listFlightFare?.map(s => {
        return s.FareInfo
    }) || [];

    let detailData = {
        Currency: listFare.length > 0 ? listFare[0].Currency : '',
        ListFare: listFare?.map(s => {
            const fareInfo = s.ListFarePax[0].ListFareInfo[0];
            const id = dtcCommon.makeid(6)
            return {
                Airline: s.Airline,
                AirlineName: dtcCommon.getAirline(s.Airline).Name,
                TotalFare: dtcCommon.formatMoney(s.TotalFare),
                Route: fareInfo.StartPoint + '-' + fareInfo.EndPoint,
                Id: id,
                ListFarePax: s.ListFarePax.map(farePax => {
                    const tf = farePax.ListFareItem.find(fareItem => fareItem.Code === 'TICKET_FARE');
                    const tfAmount = !tf ? 0 : tf.Amount;
                    return {
                        PaxName: dtcCommon.getPaxName(farePax.PaxType) + ' x ' + farePax.PaxNumb,
                        TICKET_FARE: dtcCommon.formatMoney(tfAmount),
                        SERVICE_FEE: dtcCommon.formatMoney(farePax.TotalFare - tfAmount),
                        TotalFare: dtcCommon.formatMoney(farePax.TotalFare)
                    }
                })
            }
        }) || [],
        ListBaggage: [],
        ListService: [],
        ListPreSeat: [],
        BaggagePrice: "0",
        ServicePrice: "0",
        SeatPrice: "0",
        TotalFare: "0"
    };

    let totalFare = listFare?.reduce((a, b) => a + b.TotalFare, 0);
    let listBaggage = [];
    let listService = [];
    let listSeat = [];

    if (listPassenger !== undefined) {
        listPassenger.forEach(item => {
            if (item.ListBaggage !== undefined)
                listBaggage.push(...item.ListBaggage.map(s => {
                    s.PassengerName = item.FullName;
                    s.PriceText = dtcCommon.formatMoney(s.Price);
                    s.Route = s.StartPoint + '-' + s.EndPoint;
                    return JSON.parse(JSON.stringify(s))
                }));
            if (item.ListService !== undefined)
                listService.push(...item.ListService.map(s => {
                    s.PassengerName = item.FullName;
                    s.PriceText = dtcCommon.formatMoney(s.Price);
                    s.Route = s.StartPoint + '-' + s.EndPoint;
                    return JSON.parse(JSON.stringify(s))
                }));
            if (item.ListPreSeat !== undefined)
                listSeat.push(...item.ListPreSeat.map(s => {
                    s.PassengerName = item.FullName;
                    s.PriceText = dtcCommon.formatMoney(s.Price);
                    s.Route = s.StartPoint + '-' + s.EndPoint;
                    return s;
                }));
        })
    }

    if (listBaggage.length > 0) {
        const total = listBaggage.reduce((a, b) => a + b.Price, 0);
        totalFare += total;

        detailData.ListBaggage = listBaggage;
        detailData.BaggagePrice = dtcCommon.formatMoney(total);
    }
    if (listService.length > 0) {
        const total = listService.reduce((a, b) => a + b.Price, 0);
        totalFare += total;

        detailData.ListService = listService;
        detailData.ServicePrice = dtcCommon.formatMoney(total);
    }
    if (listSeat.length > 0) {
        const total = listSeat.reduce((a, b) => a + b.Price, 0);
        totalFare += total;

        detailData.ListPreSeat = listSeat;
        detailData.SeatPrice = dtcCommon.formatMoney(total);
    }
    detailData.TotalFare = dtcCommon.formatMoney(totalFare);

    // Xây dựng bookingRequest và bổ sung chi tiết từ detailData
    const bookingRequest = {
        GuestContact: getValueByName(document.querySelectorAll('.dtc-contact [name]')),
        AgentContact: getValueByName(document.querySelectorAll('.dtc-agent-contact [name]')),
        ListPassenger: listPassenger, 
        ListAirOption: listFlightFare.map(s => ({
            Session: s.Session,
            SessionType: 'verify'
        })),
        
        // Flights với tên hãng, tên TP, thời gian bay
        Flights: listFlightFare.flatMap(flightFare =>
            flightFare.ListFlight.flatMap(flight =>
                flight.ListSegment.map(segment => {
                    // Tên hãng bay
                    const displayAirline = dtcCommon.getAirline(segment.Airline === 'VN' ? segment.Operator : segment.Airline);
                    const airlineName = displayAirline ? displayAirline.Name : segment.Airline;

                    // Tên thành phố
                    const startCity = dtcCommon.getCity(segment.StartPoint)?.Name || segment.StartPoint;
                    const endCity = dtcCommon.getCity(segment.EndPoint)?.Name || segment.EndPoint;

                    // Thời gian bay
                    const startTime = new Date(segment.StartDate);
                    const endTime = new Date(segment.EndDate);
                    const diffMs = endTime - startTime;
                    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
                    const flightDuration = `${diffHours}h ${diffMinutes}m`;

                    return {
                        Airline: segment.Airline,
                        AirlineName: airlineName,         
                        FlightNumber: segment.FlightNumber,
                        StartPoint: segment.StartPoint,
                        StartCityName: startCity,         
                        EndPoint: segment.EndPoint,
                        EndCityName: endCity,             
                        StartDate: segment.StartDate,
                        EndDate: segment.EndDate,
                        Duration: flightDuration,         
                        FareClass: flightFare.FareInfo?.ListFarePax?.[0]?.ListFareInfo?.find(
                            n => n.StartPoint == segment.StartPoint && n.EndPoint == segment.EndPoint
                        )?.FareClass || ''
                    };
                })
            )
        ),

        // Hành lý
        Baggage: listPassenger.flatMap(p =>
            (p.ListBaggage || []).map(b => ({
                Passenger: `${p.Surname}/${p.GivenName}`,
                Airline: b.Airline,
                StartPoint: b.StartPoint,
                EndPoint: b.EndPoint,
                Name: b.Name,
                Price: b.Price
            }))
        ),

        // Ghế
        PreSeat: listPassenger.flatMap(p =>
            (p.ListPreSeat || []).map(s => ({
                Passenger: `${p.Surname}/${p.GivenName}`,
                StartPoint: s.StartPoint,
                EndPoint: s.EndPoint,
                Name: s.Name,
                Price: s.Price
            }))
        ),

        // Dịch vụ
        Services: listPassenger.flatMap(p =>
            (p.ListService || []).map(sv => ({
                Passenger: `${p.Surname}/${p.GivenName}`,
                Airline: sv.Airline,
                StartPoint: sv.StartPoint,
                EndPoint: sv.EndPoint,
                Name: sv.Name,
                Price: sv.Price
            }))
        ),

        ServiceFee: {},
        Invoice: getValueByName(document.querySelectorAll('.dtc-invoice-card input[name]')),
        Option: {},
        totalPrice: getValueFromPriceBlock(document.querySelector('.dtc-confirm-total')),

        // Bổ sung chi tiết từ detailData (tương tự showDetail)
        ListFare: detailData.ListFare,
        ListBaggage: detailData.ListBaggage,
        ListService: detailData.ListService,
        ListPreSeat: detailData.ListPreSeat,
        BaggagePrice: detailData.BaggagePrice,
        ServicePrice: detailData.ServicePrice,
        SeatPrice: detailData.SeatPrice,
        TotalFare: detailData.TotalFare
    };

    console.log("Dữ liệu gửi API:", bookingRequest); 



    
    document.querySelector('#dtcConfirmBook .dtc-btn-modal-close').click();
    setTimeout(function () {
        dtcCommon.postJson(dtcRequestUrl.BookFlight, bookingRequest, function (data) {
            if (data.Success || data.OrderId) {
                let s = 'dtco=' + data.OrderId;
                const lang = urlParams.get('dtcl');
                if (lang) s += '&dtcl=' + lang;
                location.href = location.origin + location.pathname + '?' + s;
            } else {
                setTimeout(function () {
                    document.querySelector('#dtcConfirmBook').classList.remove('dtc-show');
                    if (errorModal) {
                        errorModal.querySelector('.dtc-error-body').innerHTML = data.Message;
                        errorModal.classList.add("dtc-show");
                    }
                }, 300);
            }
        });
    }, 300);


        showToast("Đặt vé thành công!");
        console.log("Dữ liệu gửi API:")
};


    // const bookFlight = function (element) {
    //     const errorModal = document.querySelector('#dtcBookError');
    //     if (errorModal) {
    //         errorModal.classList.remove('dtc-show');
    //     }

    //     const bookingRequest = {
    //         GuestContact: getValueByName(document.querySelectorAll('.dtc-contact [name]')),
    //         AgentContact: getValueByName(document.querySelectorAll('.dtc-agent-contact [name]')),
    //         ListPassenger: listPassenger,
    //         ListAirOption: listFlightFare.map(s => {
    //             return {
    //                 Session: s.Session,
    //                 SessionType: 'verify'
    //             }
    //         }),
    //         ServiceFee: {},
    //         Invoice: getValueByName(document.querySelectorAll('.dtc-invoice-card input[name]')),
    //         Option: {},
    //         totalPrice: getValueFromPriceBlock(document.querySelector('.dtc-confirm-total'))
    //     };
       
    //      document.querySelector('#dtcConfirmBook .dtc-btn-modal-close').click();
    //     setTimeout(function () {
    //         //  showLoaderModal();
    //         dtcCommon.postJson(dtcRequestUrl.BookFlight, bookingRequest, function (data) {
    //             //  hideLoaderModal();
    //             if (data.Success || data.OrderId) {
    //                 let s = 'dtco=' + data.OrderId;

    //                 const lang = urlParams.get('dtcl');
    //                 if (lang)
    //                     s += '&dtcl=' + lang

    //                 location.href = location.origin + location.pathname + '?' + s;
    //             }
    //             else {
    //                 setTimeout(function () {
    //                     document.querySelector('#dtcConfirmBook').classList.remove('dtc-show');

    //                     if (errorModal) {
    //                         errorModal.querySelector('.dtc-error-body').innerHTML = data.Message;
    //                         errorModal.classList.add("dtc-show");
    //                     }
    //                 }, 300);
    //             }
    //         });
    //     }, 300);
    // }
    const showMobileCart = function () {
        const mobileCart = document.querySelector(".mobile-cart");
        if (mobileCart) mobileCart.classList.remove('dtc-d-none');
    }
    const hideMobileCart = function () {
        const mobileCart = document.querySelector(".mobile-cart");
        if (mobileCart) mobileCart.classList.add('dtc-d-none');
    }
    const showPaxCart = function (listFare) {
        if (listFare === undefined) {
            listFare = listFlightFare?.map(s => {
                return s.FareInfo
            })
        }
        if (listFare?.length > 0) {
            let totalFare = listFare?.reduce((a, b) => a + b.TotalFare, 0);
            const data = {
                Currency: listFare[0].Currency,
            }
            let totalADT = 0;
            let totalCHD = 0;
            let totalINF = 0;

            listFare.forEach((option, index) => {
                option.ListFarePax.forEach(pax => {
                    if (pax.PaxType === "ADT") {
                        totalADT += pax.TotalFare;
                        if (index === 0) {
                            data.countADT = pax.PaxNumb
                        }
                    }
                    else if (pax.PaxType === "CHD") {
                        totalCHD += pax.TotalFare;
                        if (index === 0) {
                            data.countCHD = pax.PaxNumb
                        }
                    }
                    else if (pax.PaxType === "INF") {
                        totalINF += pax.TotalFare;
                        if (index === 0) {
                            data.countINF = pax.PaxNumb
                        }
                    }
                });
            });

            if (data.countADT) {
                data.totalADT = dtcCommon.formatMoney(totalADT);
                data.sumADT = dtcCommon.formatMoney(totalADT * data.countADT);
            }
            if (data.countCHD) {
                data.totalCHD = dtcCommon.formatMoney(totalCHD);
                data.sumCHD = dtcCommon.formatMoney(totalCHD * data.countCHD);
                data.CHDStyle = 'display: flex'
            }
            if (data.countINF) {
                data.totalINF = dtcCommon.formatMoney(totalINF);
                data.sumINF = dtcCommon.formatMoney(totalINF * data.countINF);
                data.INFStyle = 'display: flex'
            }

            let listBaggage = [];
            let listService = [];
            let listSeat = [];
            if (listPassenger !== undefined) {
                listPassenger.forEach(item => {
                    if (item.ListBaggage !== undefined)
                        listBaggage.push(...item.ListBaggage);
                    if (item.ListService !== undefined)
                        listService.push(...item.ListService);
                    if (item.ListPreSeat !== undefined)
                        listSeat.push(...item.ListPreSeat);
                })
            }
            let showPriceWrap = false;
            if (listBaggage.length > 0) {
                const total = listBaggage.reduce((a, b) => a + b.Price, 0);
                totalFare += total;

                data.BaggageCount = listBaggage.length;
                data.BaggageStyle = `display: flex`;
                data.BaggagePrice = dtcCommon.formatMoney(total);
                showPriceWrap = true;
            }
            if (listService.length > 0) {
                const total = listService.reduce((a, b) => a + b.Price, 0);
                totalFare += total;

                data.ServiceCount = listService.length;
                data.ServiceStyle = `display: flex`;
                data.ServicePrice = dtcCommon.formatMoney(total);
                showPriceWrap = true;
            }
            if (listSeat.length > 0) {
                const total = listSeat.reduce((a, b) => a + b.Price, 0);
                totalFare += total;

                data.SeatCount = listSeat.length;
                data.SeatStyle = `display: flex`;
                data.SeatPrice = dtcCommon.formatMoney(total);
                showPriceWrap = true;
            }
            if (!showPriceWrap)
                data.showWrap = `display: none`;

            data.TotalFare = dtcCommon.formatMoney(totalFare);

            dtcCommon.getView(dtcPaxCart, dtcRequestViewUrl.OrderCart, () => {
                dtcCommon.mapDataToView(data, dtcPaxCart);

                dtcPlugin.changeMobileBookBar();
                showMobileCart();

                const mobileCart = document.querySelector(".mobile-cart .dtc-txt-mobile-price");
                if (mobileCart) mobileCart.innerText = data.TotalFare;
            })
        }
    }
    const showDetail = function () {
        const listFare = listFlightFare?.map(s => {
            return s.FareInfo
        })
        if (listFare === undefined) return;

        const data = {
            Currency: listFare[0].Currency,
            ListFare: listFare?.map(s => {
                const fareInfo = s.ListFarePax[0].ListFareInfo[0];
                const id = dtcCommon.makeid(6)
                return {
                    Airline: s.Airline,
                    AirlineName: dtcCommon.getAirline(s.Airline).Name,
                    TotalFare: dtcCommon.formatMoney(s.TotalFare),
                    Route: fareInfo.StartPoint + '-' + fareInfo.EndPoint,
                    Id: id,
                    ListFarePax: s.ListFarePax.map(farePax => {
                        const tf = farePax.ListFareItem.find(fareItem => fareItem.Code === 'TICKET_FARE');
                        const tfAmount = !tf ? 0 : tf.Amount;
                        return {
                            PaxName: dtcCommon.getPaxName(farePax.PaxType) + ' x ' + farePax.PaxNumb,
                            TICKET_FARE: dtcCommon.formatMoney(tfAmount),
                            SERVICE_FEE: dtcCommon.formatMoney(farePax.TotalFare - tfAmount),
                            TotalFare: dtcCommon.formatMoney(farePax.TotalFare)
                        }
                    })
                }
            })
        }

        let totalFare = listFare?.reduce((a, b) => a + b.TotalFare, 0);
        let listBaggage = [];
        let listService = [];
        let listSeat = [];

        if (listPassenger !== undefined) {
            listPassenger.forEach(item => {
                if (item.ListBaggage !== undefined)
                    listBaggage.push(...item.ListBaggage.map(s => {
                        s.PassengerName = item.FullName;
                        s.PriceText = dtcCommon.formatMoney(s.Price);
                        s.Route = s.StartPoint + '-' + s.EndPoint;
                        return JSON.parse(JSON.stringify(s))
                    }));
                if (item.ListService !== undefined)
                    listService.push(...item.ListService.map(s => {
                        s.PassengerName = item.FullName;
                        s.PriceText = dtcCommon.formatMoney(s.Price);
                        s.Route = s.StartPoint + '-' + s.EndPoint;
                        return JSON.parse(JSON.stringify(s))
                    }));
                if (item.ListPreSeat !== undefined)
                    listSeat.push(...item.ListPreSeat.map(s => {
                        s.PassengerName = item.FullName;
                        s.PriceText = dtcCommon.formatMoney(s.Price);
                        s.Route = s.StartPoint + '-' + s.EndPoint;
                        return s;
                    }));
            })
        }

        data.BaggageStyle = `display: none`;
        data.ServiceStyle = `display: none`;
        data.SeatStyle = `display: none`;
        if (listBaggage.length > 0) {
            const total = listBaggage.reduce((a, b) => a + b.Price, 0);
            totalFare += total;

            data.BaggageStyle = `display: flex`;
            data.ListBaggage = listBaggage;
            data.BaggagePrice = dtcCommon.formatMoney(total);
        }
        if (listService.length > 0) {
            const total = listService.reduce((a, b) => a + b.Price, 0);
            totalFare += total;

            data.ServiceStyle = `display: flex`;
            data.ListService = listService;
            data.ServicePrice = dtcCommon.formatMoney(total);
        }
        if (listSeat.length > 0) {
            const total = listSeat.reduce((a, b) => a + b.Price, 0);
            totalFare += total;

            data.SeatStyle = `display: flex`;
            data.ListPreSeat = listSeat;
            data.SeatPrice = dtcCommon.formatMoney(total);
        }
        data.TotalFare = dtcCommon.formatMoney(totalFare);

        const modal = document.getElementById('dtc-modal');
        const modalBody = modal.querySelector('.dtc-modal-body');
        dtcCommon.getView(modalBody, dtcRequestUrl.Modal.ModalDetailCart, () => {
            const id = dtcCommon.makeid(8);
            modal.querySelector('.dtc-modal-header').style.display = 'block';
            modal.querySelector('.dtc-modal-header .modal-title').innerHTML = 'Tổng hợp đơn hàng';
            dtcCommon.mapDataToView(data, modalBody);

            modal.classList.add('dtc-show');
        });
    }
    const clickService = function (target, element) {
        element.removeAttribute('onclick');
        dtcCommon.collapse(target, element)
        document.querySelector('#' + target).innerHTML = '<div class="dtc-loader"></div>';

        nextToService(dtcFlight.getSelected());
        dtcCommon.postView(dService,
            dtcRequestUrl.GetAncillary,
            {
                ancillaries: rqService,
                passengers: listPassenger.filter(s => s.Type !== 'INF'),
                target: target
            }, function () {
                changeNamePassenger();

            });
    }
    const clickSeatMap = function (target, element) {
        element.removeAttribute('onclick');
        dtcCommon.collapse(target, element)
        document.querySelector('#' + target).innerHTML = '<div class="dtc-loader"></div>';

        nextToService(dtcFlight.getSelected());
        dtcCommon.postView(dSeatMap, dtcRequestUrl.GetSeatMap, rqService, function () {
            changeNamePassenger();

        });
    }
    const changeNamePassenger = function () {
        if (!listPassenger || listPassenger.length === 0)
            nextToService(dtcFlight.getSelected());

        listPassenger.forEach(item => {
            const dtcPax = document.querySelector(`.dtc-pax[data-index="${item.Index}"]`);
            const passenger = getValueByName(dtcPax.querySelectorAll('.dtc-group-input [name]'));
            item.FullName = passenger.FullName || 'Hành khách ' + item.Index;
            item.Gender = passenger.Gender;
            item.GivenName = passenger.GivenName;
            item.Surname = passenger.Surname;
            item.Passport = getValueByName(dtcPax.querySelectorAll('.dtc-passport [name]'));
            item.ListMembership = [...dtcPax.querySelectorAll('.dtc-loyality input')].map(m => {
                return {
                    Airline: m.dataset.airline,
                    MembershipID: m.value
                }
            });
            item.Title = getPrefix(passenger.Type, passenger.Gender);
            const date = dtcPax.querySelector("[name='DateOfBirth']").value;
            item.DateOfBirth = date ? date.replaceAll("/", "") : null;

            const parent = dtcPax.querySelector('select[name="ParentId"]');
            if (parent) {
                item.ParentId = parent.value;
            }
            if (dtcPax.hasAttribute("data-pax-type") && dtcPax.getAttribute("data-pax-type") === "ADT") {
                const infs = dtcPax.closest('.dtc-list-pax').querySelectorAll('.dtc-pax[data-pax-type="INF"]');
                if (infs && infs.length > 0) {
                    infs.forEach(inf => {
                        const parentSelect = inf.querySelector('select[name="ParentId"]');
                        if (parentSelect) {
                            parentSelect.querySelectorAll("option").forEach(opt => {
                                if (opt.value === item.Index) {
                                    opt.text = item.FullName;
                                }
                            })
                        }
                    });
                }
            }
            document.querySelectorAll(`[data-name-passenger='${item.Index}']`).forEach(e => {
                e.querySelector('.dtc-dpaxname').innerHTML = item.FullName;
            })
            document.querySelectorAll(`.dtc-seat-pax-row[data-index='${item.Index}'`).forEach(e => {
                e.querySelector('.dtc-pax-name').innerHTML = item.FullName;
            });
        })
    }
    return {
        init,
        nextToService,
        updateNameService,
        updateSeatPassenger,
        selectSeat,
        selectBaggage,
        selectService,
        bookFlight,
        showPaxCart,
        showConfirm,
        showDetail,
        clickService,
        clickSeatMap,
        changeNamePassenger,
        showMobileCart,
        hideMobileCart
    }
}();
const dtcPlugin = function () {
    const listData = [];
    let listDataVerifyFlight = [];
    const listGroup = [];
    let requestSearch;
    let timeOut = 0;
    let timeoutId;
    let step = 1;
    const getItinType = function () {
        if (requestSearch.ListRoute.length === 1
            || requestSearch.ListRoute.length === 2
            && requestSearch.ListRoute[0].StartPoint === requestSearch.ListRoute[1].EndPoint
            && requestSearch.ListRoute[1].StartPoint === requestSearch.ListRoute[0].EndPoint) {

            if (requestSearch.ListRoute.length === 2) {
                //returnDate.value = convertDateFormat(request.ListRoute[1].DepartDate);
                return "RT";
            }
            return "OW";
        } else {
            return 'MC';
        }
    }
    const getRequestSearch = function () {
        return requestSearch ? requestSearch.ListRoute : [];
    }
    const buildRouteSearch = function (point) {
        const airport = dtcCommon.getAirport(point);
        if (airport) {
            const city = dtcCommon.getCity(airport.CityCode);
            if (city) {
                const country = dtcCommon.getCountry(city.CountryCode);
                if (country) {
                    return `${city.Name}<span class="dtc-loading-city-name">, ${country.Name} (${point})</span>`;
                }
            }
        }
        return point;
    }
    const showLoadingSearch = function () {
        const itin = getItinType();
        document.querySelector('.dtc-loading-top').innerHTML = "";
        switch (itin) {
            case 'OW':
                document.querySelector('.dtc-loading-top').innerHTML =
                    `<div class="dtc-loading-route dtc-pri-cl">
                    <span class="dtc-bold-medium">${buildRouteSearch(requestSearch.ListRoute[0].StartPoint)}</span> <span class="dtc-mx-1">→</span> <span class="dtc-bold-medium">${buildRouteSearch(requestSearch.ListRoute[0].EndPoint)}</span>
                </div>
                <div class="dtc-loading-date">
                    Ngày đi <span class="dtc-bold-medium">${dtcSearch.convertDateFormat(requestSearch.ListRoute[0].DepartDate)}</span>
                </div>`;
                break;
            case 'RT':
                document.querySelector('.dtc-loading-top').innerHTML =
                    `<div class="dtc-loading-route dtc-pri-cl">
                        <span class="dtc-bold-medium dtc-pri-cl">${buildRouteSearch(requestSearch.ListRoute[0].StartPoint)}</span> <span class="dtc-mx-1">↔</span> <span class="dtc-bold-medium">${buildRouteSearch(requestSearch.ListRoute[0].EndPoint)}</span>
                    </div>
                    <div class="dtc-loading-date">
                        Ngày đi <span class="dtc-bold-medium">${dtcSearch.convertDateFormat(requestSearch.ListRoute[0].DepartDate)}</span> ― Ngày về <span class="dtc-bold-medium">${dtcSearch.convertDateFormat(requestSearch.ListRoute[1].DepartDate)}</span>
                    </div>`;
                break;
            case 'MC':
                document.querySelector('.dtc-loading-top').innerHTML =
                    `<div class="dtc-loading-route dtc-pri-cl">
                        <span class="dtc-bold-medium">${buildRouteSearch(requestSearch.ListRoute[0].StartPoint)}</span> <span class="dtc-mx-1">⥃</span> <span class="dtc-bold-medium">${buildRouteSearch(requestSearch.ListRoute[requestSearch.ListRoute.length - 1].EndPoint)}</span>
                    </div>
                    <div class="dtc-loading-date">
                        Ngày khởi hành <span class="dtc-bold-medium">${dtcSearch.convertDateFormat(requestSearch.ListRoute[0].DepartDate)}</span>
                    </div>`;
                break;
            default: document.querySelector('.dtc-loading-top').innerHTML =
                `<div class="dtc-loading-route dtc-pri-cl">
                    <span class="dtc-bold-medium">${buildRouteSearch(requestSearch.ListRoute[0].StartPoint)}</span> <span class="dtc-mx-1">→</span> <span class="dtc-bold-medium">${buildRouteSearch(requestSearch.ListRoute[0].EndPoint)}</span>
                </div>
                <div class="dtc-loading-date">
                    Ngày đi <span class="dtc-bold-medium">${dtcSearch.convertDateFormat(requestSearch.ListRoute[0].DepartDate)}</span>
                </div>`;
                break;
        }
        dtcSearchLoading.style.display = 'block';
    }
    const setValidatePax = function (system) {
        var adt = document.querySelectorAll('.dtc-list-pax .dtc-pax[data-pax-type="ADT"]');
        if (adt && adt.length > 0) {
            // tự động thêm DOB
            if (systemConfigs && systemConfigs.length > 0) {
                const sysConf = systemConfigs.find(n => n.System === system);
                if (sysConf) {
                    adt.forEach(element => {
                        if (sysConf.RequiredDob) {
                            const dob = element.querySelector('[name="DateOfBirth"]');
                            if (dob) {
                                dob.required = true;
                                dob.placeholder = "Ngày sinh *";
                            }
                        }
                        if (sysConf.RequiredDoc) {
                            const docType = element.querySelector('[name="DocumentType"]');
                            const doc = element.querySelector('[name="DocumentCode"]');
                            if (docType && doc) {
                                docType.addEventListener('change', function () {
                                    dtcFlight.changeDocumentType(this);
                                })
                                doc.required = true;
                                const expire = element.querySelector('[name="DocumentExpiry"]');
                                if (expire) expire.required = docType.value === "passport";

                                const national = element.querySelector('[name="Nationality"]');
                                if (national) national.required = true;
                                const country = element.querySelector('[name="IssueCountry"]');
                                if (country) country.required = true;


                                const action = element.querySelector('.dtc-pax-more-action');
                                const actionContent = element.querySelector('.dtc-passenger-content');
                                if (action && actionContent) {
                                    action.classList.add('active');
                                    actionContent.classList.add('dtc-open');
                                }
                            }
                        }
                        if (sysConf.AutoAddDob) {
                            const dob = element.querySelector('[name="DateOfBirth"]');
                            if (dob) {
                                dob.value = `01/01/${(new Date().getFullYear()) - 20}`;
                            }
                        }
                        if (sysConf.AutoAddDoc) {
                            const doc = element.querySelector('[name="DocumentCode"]');
                            if (doc) doc.value = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
                            const national = element.querySelector('[name="Nationality"]');
                            if (national) national.value = "VN";
                            const country = element.querySelector('[name="IssueCountry"]');
                            if (country) country.value = "VN";
                        }
                    })

                }
            }
        }
    }
    const verifyFlight = function () {
        //dtcPaxCart.style.display = 'block';
        const selectedFlight = formInputPassenger.querySelector('.dtc-selected-body');
        const bodyCart = dtcPaxCart.querySelector('.dtc-card-body');
        if (!bodyCart) {
            setTimeout(function () { verifyFlight() }, 100);
            return;
        }
        selectedFlight.classList.add('dtc-loader-body');
        bodyCart.classList.add('dtc-loader-body');
        dtcCommon.postJson(dtcRequestUrl.VerifyFlight,
            {
                ListSession: dtcFlight.getSelected()
            },
            function (data) {
                if (data && data.length > 0) {
                    //selectedFlight.style.background = '#fff';
                    listDataVerifyFlight = data;
                    dtcBook.init(data);
                    selectedFlight.innerHTML = '';
                    data.forEach((item, index) => {
                        const div = document.createElement('DIV');
                        div.className = 'dtc-selected-flight';
                        div.innerHTML = getFlightHtml2(item.ListFlight, item.FareInfo, null,
                            {
                                Journey: item.Journey
                            }, index);
                        selectedFlight.appendChild(div);

                        setValidatePax(item.System);
                    });




                    selectedFlight.classList.remove('dtc-loader-body');
                    bodyCart.classList.remove('dtc-loader-body');
                    dtcBook.showPaxCart();
                }
                else {
                    //setTimeout(function () {
                    //    verifyFlight();
                    //}, 1000)

                    const modal = document.getElementById('dtc-modal');
                    const modalBody = modal.querySelector('.dtc-modal-body');
                    modalBody.innerHTML = "";
                    modalBody.innerHTML = `<div>
                        <div class="dtc-verify-title">Hệ thống không thể xác nhận giá cho các chuyến bay đã chọn</div>
                        <div style="text-align: center;"><img src="${dtcBaseUrl}/icon/error.svg" width="200" /></div>
                        <div class="dtc-verify-desc">Vui lòng chọn lại chuyến bay khác hoặc liên hệ quản trị viên để được trợ giúp</div>
                    </div>`;

                    modal.querySelector('.dtc-modal-header').style.display = 'block';
                    modal.querySelector('.dtc-modal-header .modal-title').innerHTML = 'Thông báo';
                    modal.classList.add('dtc-show');
                }
            });
    }
    const getFareOption = function (session, journey, airOption, fareOption, verifyFlightIndex) {
        const res = verifyFlightIndex !== undefined ? listDataVerifyFlight[verifyFlightIndex].FareInfo : listData.find(s => s.Session === session)?.ListGroup
            .find(s => s.Journey === journey)?.ListAirOption
            .find(s => s.OptionId == airOption)?.ListFareOption
            .find(s => s.OptionId == fareOption);
        return JSON.parse(JSON.stringify(res));
    }
    const printfSelectFlight = function () {
        const selected = dtcFlight.getSelected();
        if (selected.length > 0) {
            dSelectFlight.style.display = 'unset';
        } else {
            dSelectFlight.style.display = 'none';
        }
        dListSelectFlight.innerHTML = '';
        selected.forEach(item => {
            const div = document.createElement('DIV');
            div.className = 'dtc-selected-flight';
            div.innerHTML = getFlightHtml(null, item);
            dListSelectFlight.appendChild(div);
        });
    }
    const getDetailInfoHtml = function (flights) {
        let res = '';
        flights.forEach(flight => {
            let airStartPoint = dtcCommon.getAirport(flight.StartPoint);
            let airEndPoint = dtcCommon.getAirport(flight.EndPoint);
            let cityStartPoint = dtcCommon.getCity(airStartPoint.CityCode);
            let cityEndPoint = dtcCommon.getCity(airEndPoint.CityCode);
            let countryStartPoint = dtcCommon.getCountry(cityStartPoint.CountryCode);
            let countryEndPoint = dtcCommon.getCountry(cityEndPoint.CountryCode);

            let html = '<div>';
            html += `<div class="dtc-flight-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18" fill="none">
                            <path d="M17.56 0.909976C18.15 1.49998 18.15 2.44998 17.56 3.02998L13.67 6.91998L15.79 16.11L14.38 17.53L10.5 10.1L6.6 14L6.96 16.47L5.89 17.53L4.13 14.35L0.940002 12.58L2 11.5L4.5 11.87L8.37 7.99998L0.940002 4.08998L2.36 2.67998L11.55 4.79998L15.44 0.909976C16 0.329976 17 0.329976 17.56 0.909976Z" fill="black" />
                        </svg>
                        Chuyến bay từ <strong>${cityStartPoint.Name}</strong> đến <strong>${cityEndPoint.Name}</strong>
                    </div>`;

            html += '<div class="dtc-segment-list">';

            flight.ListSegment.forEach(segment => {
                airStartPoint = dtcCommon.getAirport(segment.StartPoint);
                airEndPoint = dtcCommon.getAirport(segment.EndPoint);
                cityStartPoint = dtcCommon.getCity(airStartPoint.CityCode);
                cityEndPoint = dtcCommon.getCity(airEndPoint.CityCode);
                countryStartPoint = dtcCommon.getCountry(cityStartPoint.CountryCode);
                countryEndPoint = dtcCommon.getCountry(cityEndPoint.CountryCode);

                const timeSegment = dtcCommon.getTimeFlight(new Date(segment.StartDate), new Date(segment.EndDate));
                const displayAirline = dtcCommon.getAirline(flight.Airline === 'VN' ? flight.Operator : flight.Airline);
                const arlineName = displayAirline ? displayAirline.Name : segment.Airline;
                html += `<div class="dtc-segment">
                            <div class="dtc-left">
                                <div class="dtc-head">
                                    <div class="dtc-detail-time">
                                        <div class="dtc-detail-hour">${timeSegment.TimeStart}</div>
                                        <div class="dtc-detail-date">${segment.DepartDate.split(' ')[0].substr(0, 2)}/${segment.ArriveDate.split(' ')[0].substr(2, 2)}</div>
                                    </div>
                                    <div class="dtc-airline">
                                        <img src="${dtcBaseUrl}img/airlines/${flight.Airline}.gif" alt="Airline">
                                    </div>
                                    <div class="dtc-detail-time">
                                        <div class="dtc-detail-hour">${timeSegment.TimeEnd}</div>
                                        <div class="dtc-detail-date">${segment.ArriveDate.split(' ')[0].substr(0, 2)}/${segment.DepartDate.split(' ')[0].substr(2, 2)}</div>
                                    </div>
                                </div>
                                <div class="dtc-line">
                                    <div class="dtc-dot"></div>
                                    <div class="dtc-inner"></div>
                                    <div class="dtc-dot"></div>
                                </div>
                                <div class="dtc-detail-route">
                                    <div class="dtc-detail-point">
                                        <div class="dtc-detail-city">${cityStartPoint.Name}, ${countryStartPoint.Name} (${segment.StartPoint})</div>
                                        <div class="dtc-detail-airport">
                                            ${airStartPoint.Name} ${segment.StartTerminal ? `• <span class="terminal">Nhà ga: ${segment.StartTerminal}</span>` : ''} 
                                        </div>
                                    </div>
                                    <div class="dtc-connect">
                                        <div class="dtc-connect-airline">
                                            ${dtcCommon.getAirline(flight.Airline).Name}
                                        </div>
                                        <div class="dtc-info dtc-connect-info">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Số hiệu:</td>
                                                        <td>
                                                            <strong>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18" fill="none">
                                                                    <path d="M17.56 0.909976C18.15 1.49998 18.15 2.44998 17.56 3.02998L13.67 6.91998L15.79 16.11L14.38 17.53L10.5 10.1L6.6 14L6.96 16.47L5.89 17.53L4.13 14.35L0.940002 12.58L2 11.5L4.5 11.87L8.37 7.99998L0.940002 4.08998L2.36 2.67998L11.55 4.79998L15.44 0.909976C16 0.329976 17 0.329976 17.56 0.909976Z" fill="black" />
                                                                </svg> ${segment.Airline + segment.FlightNumber}
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Thời gian bay:</td>
                                                        <td><strong>${dtcCommon.getDuration(segment.Duration)}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Hãng khai thác:</td>
                                                        <td class="dtc-text-ellipsis">${arlineName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Loại máy bay:</td>
                                                        <td class="dtc-text-ellipsis">${dtcCommon.getAircraft(segment.Equipment)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="dtc-detail-point">
                                        <div class="dtc-detail-city">${cityEndPoint.Name}, ${countryEndPoint.Name} (${segment.EndPoint})</div>
                                        <div class="dtc-detail-airport">
                                            ${airEndPoint.Name} ${segment.EndTerminal ? `• <span class="terminal">Nhà ga: ${segment.EndTerminal}</span>` : ''} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dtc-info">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Số hiệu chuyến bay:</td>
                                            <td>
                                                <strong>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18" fill="none">
                                                        <path d="M17.56 0.909976C18.15 1.49998 18.15 2.44998 17.56 3.02998L13.67 6.91998L15.79 16.11L14.38 17.53L10.5 10.1L6.6 14L6.96 16.47L5.89 17.53L4.13 14.35L0.940002 12.58L2 11.5L4.5 11.87L8.37 7.99998L0.940002 4.08998L2.36 2.67998L11.55 4.79998L15.44 0.909976C16 0.329976 17 0.329976 17.56 0.909976Z" fill="black" />
                                                    </svg> ${segment.Airline + segment.FlightNumber}
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Thời gian bay:</td>
                                            <td><strong>${dtcCommon.getDuration(segment.Duration)}</strong></td>
                                        </tr>
                                        <tr>
                                            <td>Hãng khai thác:</td>
                                            <td class="dtc-text-ellipsis">${arlineName}</td>
                                        </tr>
                                        <tr>
                                            <td>Loại máy bay:</td>
                                            <td class="dtc-text-ellipsis">${dtcCommon.getAircraft(segment.Equipment)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>`;

                if (segment.HasStop) {
                    const airStopPoint = dtcCommon.getAirport(segment.StopPoint);
                    const cityStopPoint = dtcCommon.getCity(airStopPoint.CityCode);
                    const countryStopPoint = dtcCommon.getCountry(cityStopPoint.CountryCode);
                    html += `<div class="dtc-stop-info">
                                <div class="dtc-stop-at">Dừng <strong>${dtcCommon.getDuration(segment.StopTime)}</strong> tại <span>${airStopPoint.Name} (${segment.StopPoint})</span></div>
                                <div class="dtc-country">${cityStopPoint.Name}, ${countryStopPoint.Name}</div>
                            </div>`;
                }
            });

            html += '</div>';
            html += '</div>';

            res += html;
        });

        return res;
    }
    const getFareRule = function (element) {
        const airRow = element.closest('.dtc-air-row');
        const airOption = airRow.querySelector('.dtc-air-option');
        const modal = document.getElementById('dtc-modal');
        const modalBody = modal.querySelector('.dtc-modal-body');
        let selected;
        const verifyFlightIndex = airOption.dataset.verifyIndex;

        modal.querySelector('.dtc-modal-header').style.display = 'block';
        modal.querySelector('.dtc-modal-header .modal-title').innerHTML = 'Điều kiện giá vé';
        modal.classList.add('dtc-show');

        if (verifyFlightIndex !== undefined) {
            const dataVerify = listDataVerifyFlight[verifyFlightIndex];

            dtcCommon.postView(modalBody, dtcRequestUrl.GetFareRule, {
                VerifySession: dataVerify.Session,
                System: dataVerify.System
            });
        }
        else {
            selected = {
                Session: airOption.dataset.session,
                AirlineOptionId: airOption.dataset.airOption,
                FareOptionId: element.closest('.dtc-fare-option').dataset.optionId,
                FlightOptionId: airOption.dataset.flightOption,
                System: airOption.dataset.system,
                Airline: airOption.dataset.airline
            }

            dtcCommon.postView(modalBody, dtcRequestUrl.GetFareRule, {
                SessionInfo: selected,
                System: selected.System
            });
        }
    }
    const getDetailFare = function (fare, isSelected) {
        const totalFare = getTotalFare(fare);
        let html = `<div class="dtc-fare-option" data-option-id="${fare.OptionId}">
                    <div class="dtc-title">
                        <div>
                            <div>
                                <span class="dtc-price">${dtcCommon.formatMoney(totalFare)}</span><small class="dtc-currency">${fare.Currency}</small>
                            </div>
                            <div class="dtc-fare-family">${fare.FareFamily || fare.CabinName}</div>
                        </div>
                        <div>
                            <a type="button"  class="dtc-btn dtc-btn-soft-primary dtc-btn-sm dtc-btn-detail" onclick="dtcFlight.viewDetailFare(this,${fare.OptionId})">
                                <span>Chi tiết</span>
                            </a>
                        </div>
                    </div>
                    <div class="dtc-option-body">
                        <div class="dtc-info-data">
                            <table>
                                <tr>
                                    <td>Hành lý ký gửi:</td>
                                    <td>${fare.ListFarePax[0]?.ListFareInfo[0]?.FreeBaggage ? `<b>${fare.ListFarePax[0].ListFareInfo[0].FreeBaggage}</b>` : 'Theo điều kiện'}</td>
                                </tr>
                                <tr>
                                    <td>Hành lý xách tay:</td>
                                    <td>${fare.ListFarePax[0]?.ListFareInfo[0]?.HandBaggage ? `<b>${fare.ListFarePax[0].ListFareInfo[0].HandBaggage}</b>` : 'Theo điều kiện'}</td>
                                </tr>
                                <tr>
                                    <td>Hoàn vé:</td>
                                    <td>${fare.Refundable && !agentConfigs.HideRefundable ? '<b class="dtc-text-success">Được phép</b>' : 'Theo điều kiện'}</td>
                                </tr>
                                <tr>
                                    <td>Hạng chỗ:</td>
                                    <td><b class="dtc-farebasic-option">${fare.FareBasis}</b></td>
                                </tr>`;
        const isDomestic = ['VN', 'VJ', 'QH', 'VU'].indexOf(fare.System) > -1;
        if (isDomestic && !agentConfigs.HideAvailable)
            html += `<tr>
                         <td>Số chỗ còn lại:</td>
                         <td><b>${fare.Availability}</b></td>
                     </tr>`;

        html += `</table>
                        </div>
                        <div class="dtc-fare-select">
                        <button type="button" class="dtc-btn dtc-btn-soft-primary" onclick="dtcPlugin.getFareRule(this)">Điều kiện giá vé</button>`;
        if (!isSelected) {
            if (!isDomestic || fare.Availability > 0)
                html += '<button type="button" class="dtc-btn dtc-btn-primary" onclick="dtcFlight.selectFlight2(this)">Chọn</button>';
            else
                html += '<button type="button" class="dtc-btn dtc-btn-primary" disabled>Chọn</button>';
        }
        html += `</div>
                </div>
                </div>`;

        return html;
    }
    const getDetailListFare = function (listFare) {
        if (!listFare) return '';
        const fareArray = Array.isArray(listFare) ? listFare : [listFare];
        let res = '';
        fareArray.forEach(fare => {
            res += getDetailFare(fare);
        });
        return res;
    }
    const showDetailFare = function (id) {
        const collapse = document.getElementById(id);
        const detailHtml = collapse.querySelector('.dtc-detail-html');

        if (detailHtml.innerHTML === '') {
            const isSelected = collapse.closest('.dtc-selected-flight') !== null;
            const airRow = collapse.closest('.dtc-air-row');
            const airOption = airRow.querySelector('.dtc-air-option');

            const verifyFlightIndex = airOption.dataset.verifyIndex;

            let flights;
            let fareOption;
            let listFareOption;

            if (verifyFlightIndex) {
                const data = listDataVerifyFlight[verifyFlightIndex];

                fareOption = data.FareInfo;
                flights = data.ListFlight;
            }
            else {
                const session = airOption.dataset.session;
                const journey = airOption.dataset.journey || airRow.closest('[data-journey]').dataset.journey;
                const airlineOptionId = airOption.dataset.airOption;
                const fareOptionId = airOption.dataset.fareOption;
                const flightOptionId = airOption.dataset.flightOption;

                const data = listData.find(s => s.Session === session);
                const group = data.ListGroup.find(s => s.Journey === journey);
                const a = group.ListAirOption.find(s => s.OptionId == airlineOptionId);
                const flightOption = a.ListFlightOption.find(s => s.OptionId == flightOptionId);

                listFareOption = agentConfigs.CheapestOnly
                    ? a.ListFareOption.find(s => s.OptionId == 0) || {}
                    : a.ListFareOption;

                fareOption = agentConfigs.CheapestOnly
                    ? listFareOption
                    : a.ListFareOption.find(s => s.OptionId == fareOptionId);

                //listFareOption = a.ListFareOption;
                //fareOption = a.ListFareOption.find(s => s.OptionId == fareOptionId);
                flights = flightOption.ListFlight;
            }

            detailHtml.innerHTML = `<div class="dtc-detail-list-fare">${isSelected ? getDetailFare(fareOption, true) : getDetailListFare(listFareOption)}</div>
                 <div class="dtc-option-detail-info">${getDetailInfoHtml(flights)}</div>`;
        }

        dtcCommon.collapse(id);
        dtcPlugin.scrollFareOption();
    }
    const getTotalFare = function (fareOption) {
        const radioValue = document.querySelector('[name="radioDisplay"]:checked').value;
        if (radioValue === '0')
            return fareOption.TotalFare;


        const fareAdt = fareOption.ListFarePax.find(s => s.PaxType === 'ADT');

        switch (radioValue) {
            case '1':
                return fareAdt.ListFareItem.filter(s => s.Code === 'TICKET_FARE').reduce((t, fareItem) => {
                    return t + fareItem.Amount;
                }, 0);
            case '2':
                return fareAdt.ListFareItem.filter(s => s.Code === 'TICKET_FARE' || s.Code === 'TICKET_TAX' || s.Code === 'TICKET_VAT' || s.Code === 'SERVICE_FEE' || s.Code === 'DISCOUNT').reduce((t, fareItem) => {
                    return t + fareItem.Amount;
                }, 0);
            default:
        }
    };
    const getWeek = function (date) {
        const list = [];
        for (let i = -3; i < 4; i++) {
            const newDate = new Date(+date + 3600 * 1000 * 24 * i);
            list.push({
                active: i === 0,
                date: newDate,
                dateString: dtcCommon.dateToDmy(newDate, ''),
                disable: newDate < new Date().setHours(0, 0, 0, 0)
            });
        }
        const current = list.find(n => n.active);
        const listWeek = list.map(n => {
            n.diff = Math.ceil(Math.abs(n.date - current.date) / (1000 * 60 * 60 * 24));
            return n;
        });
        return listWeek;
    }
    const showQuoteFlightHtml = function (list) {
        let downloadType = "PNG";
        const downloadBtn = document.querySelector('.dtc-exe-download');
        if (downloadBtn && downloadBtn.getAttribute('data-type')) {
            downloadType = downloadBtn.getAttribute('data-type');
        }
        list.forEach(group => {
            const optionGroupBody = document.querySelector(`#dtcQuote .dtc-option-group[data-journey="${group.Journey}"] .dtc-group-body`);
            if (optionGroupBody) {
                optionGroupBody.innerHTML = '';
                let html = '';
                const countOption = optionGroupBody.parentElement.querySelector(`#dtcQuote .dtc-option-group[data-journey="${group.Journey}"] .count-option`);

                if (countOption)
                    countOption.innerHTML = group.ListAirOption.length;

                if (downloadType === "PNG") {
                    group.ListAirOption.forEach(airOption => {
                        html += getQuoteHtml(airOption);
                    });
                }
                else if (downloadType === "TXT") {
                    html += "<table class='dtc-export-table'>";
                    group.ListAirOption.forEach(airOption => {
                        html += getQuoteHtml(airOption);
                    });
                    html += "</table>";
                }
                optionGroupBody.innerHTML = html;
            }
        });
    }
    const getQuoteNum = function (number) {
        return number > 9 ? number : '0' + number;
    }
    const printQuoteData = function () {
        listData.forEach(data => {
            data.ListGroup.forEach(group => {
                const groupElement = document.querySelector(`#dtcQuote [data-journey="${group.Journey}"]`);
                if (!groupElement) {
                    const date = new Date(group.DepartDate.substr(4), Number(group.DepartDate.substr(2, 2)) - 1, group.DepartDate.substr(0, 2));
                    const options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    };
                    let htmlGroupHeader = '';
                    let htmlExport = "";
                    const airStartPoint = dtcCommon.getAirport(group.StartPoint);
                    const airEndPoint = dtcCommon.getAirport(group.EndPoint);
                    const cityStartPoint = dtcCommon.getCity(airStartPoint.CityCode);
                    const cityEndPoint = dtcCommon.getCity(airEndPoint.CityCode);
                    if (group.Journey.indexOf('_') > -1) {
                        if (group.TripType === 'RT') {
                            htmlGroupHeader = `<div class="dtc-group-header-route">Chuyến bay <strong>khứ hồi</strong> từ ${cityStartPoint.Name} đến ${cityEndPoint.Name}</div>`;
                            htmlExport = `Chuyen bay khu hoi ${group.StartPoint} - ${group.EndPoint}`;
                        }
                        else {
                            const a1 = dtcCommon.getAirport(group.Journey.substr(group.Journey.length - 11, 3));
                            const c1 = dtcCommon.getCity(a1.CityCode);

                            htmlGroupHeader = `<div class="dtc-group-header-route">Chuyến bay <strong>đa chặng</strong> từ ${cityStartPoint.Name} đến ${c1.Name}</div>`;
                            htmlExport = `Chuyen bay da chang ${group.StartPoint} - ${a1}`;
                        }
                    }
                    else {
                        const countryStartPoint = dtcCommon.getCountry(cityStartPoint.CountryCode);
                        const countryEndPoint = dtcCommon.getCountry(cityEndPoint.CountryCode);

                        htmlGroupHeader = `<div class="dtc-group-header-route">${cityStartPoint.Name} <span class="dtc-flight-country-code">, ${countryStartPoint.Name} (${group.StartPoint})</span> → ${cityEndPoint.Name} <span class="dtc-flight-country-code">, ${countryEndPoint.Name} (${group.EndPoint})</span></div>`;
                        htmlExport = `Chuyen bay mot chieu ${group.StartPoint} - ${group.EndPoint}`;
                    }

                    const quoteDiv = document.createElement('DIV');
                    quoteDiv.setAttribute('data-journey', group.Journey);
                    quoteDiv.classList = 'dtc-option-group';
                    quoteDiv.setAttribute('data-trip-type', group.TripType);
                    quoteDiv.setAttribute('data-group', htmlExport);
                    quoteDiv.setAttribute('data-date', `Ngay khoi hanh: ${getQuoteNum(date.getDate())}/${getQuoteNum(date.getMonth() + 1)}/${date.getFullYear()}`);
                    quoteDiv.innerHTML = `<div class="dtc-group-header">
                                         <div class="dtc-group-header-txt">
                                            <div class="dtc-group-header-flight">
                                                ${htmlGroupHeader}
                                            <div class="dtc-group-header-depart"><span class="dtc-flight-country-code">Khởi hành: </span> <span class="dtc-fw-bold">${date.toLocaleString('vi-VN', options)}</span><span class="dtc-flight-country-code" style="margin: 0px 6px; border-right: 2px solid;"></span>
                                              <span class="dtc-total-flight-number">Có <span class="dtc-fw-bold count-option">0</span> chuyến bay</span></div>
                                              </div>
                                            </div>
                                     </div>
                                     <div class="dtc-group-body"></div>`;
                    QuoteWrap.appendChild(quoteDiv);
                }
            });
        });
        const cloneGroup = JSON.parse(JSON.stringify(listGroup));
        dtcFilter.filterAirOption(cloneGroup);
        dtcPlugin.showQuoteFlightHtml(cloneGroup);
    }
    const prinftData = function () {
        listGroup.map(item => {
            item.ListAirOption.length = 0;
            return item;
        });

        listData.forEach(data => {
            const session = data.Session;
            data.ListGroup.forEach(group => {
                let index = -1;
                if (listGroup.length > 0) {
                    index = listGroup.map(i => i.Journey).indexOf(group.Journey);
                }

                const listAirOption = group.ListAirOption.map(i => {
                    i.Session = session;
                    return i;
                });

                if (index > -1) {
                    listGroup[index].ListAirOption.push(...listAirOption);
                } else {
                    const date = new Date(group.DepartDate.substr(4), Number(group.DepartDate.substr(2, 2)) - 1, group.DepartDate.substr(0, 2));
                    const dateString = dtcCommon.dateToDmy(date, '');
                    const week = getWeek(date);

                    let htmlWeek = '';
                    week.forEach(day => {
                        htmlWeek += `<div class="${day.active ? 'dtc-active' : ''} ${day.disable ? 'dtc-disable' : ''}" 
                            onclick="location.href='${!day.active && !day.disable ? location.href.replace(dateString, day.dateString) : '#'}'">
                        ${(agentConfigs && !agentConfigs.HideNearbyDate)
                                ? `<div>
                                ${day.date.toLocaleString('vi-VN', {
                                    weekday: 'short',
                                    month: '2-digit',
                                    day: 'numeric'
                                })}
                                </div>`
                                : `<div>
                                <div style="display: block; font-weight: bold;">
                                    ${day.date.toLocaleString('vi-VN', { weekday: 'long' })}
                                </div>
                                <div style="display: block;">
                                    ${day.date.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: 'numeric' })}
                                </div>
                            </div>`
                            }
                        <div data-date="${(agentConfigs && agentConfigs.HideNearbyDate) ? '' : day.dateString}">
                        </div>
                        </div>`;
                    });

                    const options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    };
                    let htmlGroupHeader = '';
                    const airStartPoint = dtcCommon.getAirport(group.StartPoint);
                    const airEndPoint = dtcCommon.getAirport(group.EndPoint);
                    const cityStartPoint = dtcCommon.getCity(airStartPoint.CityCode);
                    const cityEndPoint = dtcCommon.getCity(airEndPoint.CityCode);
                    if (group.Journey.indexOf('_') > -1) {
                        if (group.TripType === 'RT') {
                            htmlGroupHeader = `<div class="dtc-group-header-route">Chuyến bay <strong>khứ hồi</strong> từ ${cityStartPoint.Name} đến ${cityEndPoint.Name}</div>`;
                        }
                        else {
                            const a1 = dtcCommon.getAirport(group.Journey.substr(group.Journey.length - 11, 3));
                            const c1 = dtcCommon.getCity(a1.CityCode);

                            htmlGroupHeader = `<div class="dtc-group-header-route">Chuyến bay <strong>đa chặng</strong> từ ${cityStartPoint.Name} đến ${c1.Name}</div>`;
                        }
                    }
                    else {
                        const countryStartPoint = dtcCommon.getCountry(cityStartPoint.CountryCode);
                        const countryEndPoint = dtcCommon.getCountry(cityEndPoint.CountryCode);

                        htmlGroupHeader = `<div class="dtc-group-header-route">${cityStartPoint.Name} <span class="dtc-flight-country-code">, ${countryStartPoint.Name} (${group.StartPoint})</span> → ${cityEndPoint.Name} <span class="dtc-flight-country-code">, ${countryEndPoint.Name} (${group.EndPoint})</span></div>`;
                    }

                    const div = document.createElement('DIV');
                    div.setAttribute('data-journey', group.Journey);
                    div.setAttribute('data-leg', group.Leg);
                    div.classList = 'dtc-option-group';
                    div.setAttribute('data-trip-type', group.TripType);
                    div.innerHTML = `<div class="dtc-group-header">
                                         <div class="dtc-group-header-title">
                                            <div class="dtc-group-header-flight">
                                                ${htmlGroupHeader}
                                            <div class="dtc-group-header-depart"><span class="dtc-flight-country-code">Khởi hành: </span> <span class="dtc-fw-bold">${date.toLocaleString('vi-VN', options)}</span><span class="dtc-flight-country-code" style="margin: 0px 6px; border-right: 2px solid;"></span>
                                              <span class="dtc-total-flight-number">Có <span class="dtc-fw-bold count-option">0</span> chuyến bay</span></div>
                                              </div>
                                               <div class="dtc-header-loader"><div class="dtc-loader"></div></div>
                                            </div>
                                            <div class="dtc-group-header-sort">
                                                <span>Sắp xếp theo: </span>
                                                <div class="dtc-sort dtc-checked" data-value="0">Giá vé</div>
                                                <div class="dtc-sort" data-value="1">Giờ khởi hành</div>
                                                <div class="dtc-sort" data-value="2">Giờ hạ cánh</div>
                                                <div class="dtc-sort" data-value="3">Thời gian bay</div>
                                                <div class="dtc-sort" data-value="4">Hãng hàng không</div>
                                            </div>
                                         <div class="dtc-group-header-week">${htmlWeek}</div>
                                     </div>
                                     <div class="dtc-group-body"></div>`;

                    let div2 = document.querySelector(`[data-trip-type="RT"]`);
                    if (!div2) {
                        div2 = document.querySelector(`[data-trip-type="MC"]`);
                    }
                    const div3 = document.querySelector(`[data-leg="${group.Leg + 1}"]`);
                    if(div3) div2 = div3;
                    if (div2 && group.TripType === "OW") {
                        dFlights.insertBefore(div, div2);
                    }
                    else {
                        dFlights.appendChild(div);
                    }

                    listGroup.push({
                        Journey: group.Journey,
                        TripType: group.TripType,
                        ListAirOption: listAirOption
                    });

                    requestSearch.ListRoute.forEach(item => {
                        week.forEach(day => {
                            const date = dtcCommon.dateToDmy(day.date, '');
                            const dateDiv = div.querySelector(`[data-date="${date}"]`);

                            if (day.disable) {
                                if (dateDiv)
                                    dateDiv.innerHTML = '-';
                            }
                            else {
                                dtcCommon.postJson(dtcRequestUrl.SearchMinFare,
                                    {
                                        StartPoint: item.StartPoint,
                                        EndPoint: item.EndPoint,
                                        DepartDate: date
                                    }, function (res) {
                                        if (dateDiv) {
                                            if (res.Success) {
                                                if (agentConfigs && agentConfigs.BaseNearbyDate) {
                                                    dateDiv.innerHTML = dtcCommon.formatMoney(res.MinFare?.Fare);
                                                } else {
                                                    dateDiv.innerHTML = dtcCommon.formatMoney(res.MinFare?.Total);
                                                }
                                            }
                                            else {
                                                dateDiv.innerHTML = '-';
                                            }
                                        }
                                    });
                            }
                        });
                    });

                }
            });
        });

        const listAirline = [];
        const listFaceClass = [];
        let minAmount;
        let maxAmount;
        let minTime;
        let maxTime;
        let bl = true;
        listGroup.forEach(group => {
            group.ListAirOption.forEach(item => {
                if (item.ListFareOption.length == 0)
                    return;

                const fareOption = dtcCommon.getMinFareOption(item.ListFareOption);
                const flightOption = item.ListFlightOption[0].ListFlight[0];

                let fareMin = 1000000000;
                let fareMax = 0;

                item.ListFareOption.forEach(fareOption => {
                    if (['VN', 'VJ', 'QH', 'VU'].indexOf(item.System) === -1 || fareOption.Availability > 0) {
                        if (fareMin > fareOption.TotalFare) {
                            fareMin = fareOption.TotalFare;
                        }

                        if (fareMax < fareOption.TotalFare) {
                            fareMax = fareOption.TotalFare;
                        }
                    }

                    const index = listFaceClass.findIndex(s => s.FareFamily === fareOption.FareFamily);

                    if (index === -1) {
                        listFaceClass.push({
                            FareFamily: fareOption.FareFamily
                        });
                    }
                });

                const time = new Date(flightOption.StartDate);
                const m = time.getHours() * 60 + time.getMinutes();
                if (bl) {
                    minAmount = fareMin;
                    maxAmount = fareMax;
                    minTime = m;
                    maxTime = m;
                    bl = false;
                } else {
                    if (fareMin < minAmount)
                        minAmount = fareMin;

                    if (fareMax > maxAmount)
                        maxAmount = fareMax;

                    if (minTime > m)
                        minTime = m;

                    if (maxTime < m)
                        maxTime = m;
                }

                let index = listAirline.findIndex(s => s.Airline === item.Airline);
                if (index === -1) {
                    listAirline.push({
                        Airline: item.Airline,
                        TotalFare: fareOption.TotalFare
                    });
                } else if (fareOption.TotalFare < listAirline[index].TotalFare) {
                    listAirline[index].TotalFare = fareOption.TotalFare;
                }

            });
        });

        dtcFilter.prinftFilter({
            rangeMinAmount: minAmount,
            rangeMaxAmount: maxAmount,
            rangeMinTime: minTime,
            rangeMaxTime: maxTime,
            listAirline: listAirline.sort((a, b) => a.TotalFare - b.TotalFare),
            listFaceClass: listFaceClass.sort((a, b) => a.TotalFare - b.TotalFare),
            listGroup: listGroup.map(item => item.Journey)
        });

        dtcFilter.filterAirOption(listGroup);

        dtcPlugin.showFlightHtml(listGroup);
        dtcSearchLoading.style.display = 'none';
        dtcDisplayFlights.classList.add('visible');
    }
    const showFlightHtml = function (list) {
        list.forEach(group => {
            const optionGroupBody = document.querySelector(`.dtc-option-group[data-journey="${group.Journey}"] .dtc-group-body`);
            optionGroupBody.innerHTML = '';
            let html = '';
            const countOption = optionGroupBody.parentElement.querySelector(`.dtc-option-group[data-journey="${group.Journey}"] .count-option`);

            if (countOption)
                countOption.innerHTML = group.ListAirOption.length;

            group.ListAirOption.forEach(airOption => {
                if (airOption.ListFareOption.some(s => s.Availability > 0 || !s.Unavailable))
                    html += getFlightHtml(airOption);
            });
            optionGroupBody.innerHTML = html;
        });
        const flightMobileBtn = document.querySelector('.dtc-filter-mobile');
        if (!flightMobileBtn) {
            const buttonHtml = `<div class="dtc-filter-mobile">
                <button type="button" class="dtc-btn dtc-btn-soft-primary" id="dtc-btn-change-flight-mobile" onclick="dtcSearch.toggleSearchForm()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2"/>
                      <line x1="14" y1="14" x2="20" y2="20" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Tìm lại
                </button>
                <button type="button" class="dtc-btn dtc-btn-soft-primary" id="dtc-btn-open-filter-mobile" onclick="dtcFilter.toggleFilter()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3h14a1 1 0 0 1 1 1v2a1 1 0 0 1-.447.894L14 12v7H10v-7L4.447 6.894A1 1 0 0 1 4 6V4a1 1 0 0 1 1-1z" fill="currentColor"/>
                    </svg>
                    Bộ lọc
                </button>
            </div>`;
            document.querySelector('.dtc-list-flight').insertAdjacentHTML('beforeend', buttonHtml);
        }
    }
    const getQuoteItemHtml = function (flights, listFareOption, selectedItem) {
        let downloadType = "PNG";
        const downloadBtn = document.querySelector('.dtc-exe-download');
        if (downloadBtn && downloadBtn.getAttribute('data-type')) {
            downloadType = downloadBtn.getAttribute('data-type');
        }
        const fareOption = dtcCommon.getMinFareOption(listFareOption);

        if (fareOption.Unavailable) {
            return '';
        }

        let totalFare = getTotalFare(fareOption);
        if (downloadType === "PNG") {
            let html = '<div class="dtc-air-row">';
            html += `<div class="dtc-flight-summ">`;

            flights.forEach(flight => {
                const startDate = new Date(flight.StartDate);
                const endDate = new Date(flight.EndDate);
                html += `<div class="dtc-flight-info">
                        <div class="dtc-flight-air-logo">
                            <img loading="lazy" src="${dtcBaseUrl}img/airlines/${flight.Airline == 'VN' ? flight.Operator : flight.Airline}.gif" />
                        </div>
                        <div class="dtc-flight-startdate">
                            <div class="dtc-flight-time dtc-sf-bold">${getQuoteNum(startDate.getHours())}:${getQuoteNum(startDate.getMinutes())} - ${getQuoteNum(endDate.getHours())}:${getQuoteNum(endDate.getMinutes())}</div>
                        </div>
                        <div class="dtc-flight-point">
                            <div class="dtc-flight-time dtc-sf-bold">${flight.StartPoint} - ${flight.EndPoint}</div>
                        </div>
                        <div class="dtc-flight-date">
                            <div class="dtc-flight-time dtc-sf-bold">${getQuoteNum(startDate.getDate())}/${getQuoteNum(startDate.getMonth() + 1)}</div>
                        </div>
                        <div class="dtc-flight-number">
                            <div class="dtc-flight-time dtc-sf-bold">${flight.Airline + flight.FlightNumber.replace('/', '').split(',')[0]}</div>
                        </div>
                    </div>`;
            });
            html += '</div>';

            html += `<div class="dtc-flight-price-content">
            <div class="dtc-flight-fareclass"><div>${listFareOption.length > 0 ? listFareOption[0].FareFamily : ''}</div></div>
            <div class="dtc-total-fare">
                <b>${dtcCommon.formatMoney(totalFare)}</b>`;

            html += '<div class="dtc-list-fare-option">';
            html += '</div></div></div>';
            html += '</div>';
            return html;
        }
        else if (downloadType === "TXT") {
            let html = "";
            flights.forEach((flight, i) => {
                const startDate = new Date(flight.StartDate);
                const endDate = new Date(flight.EndDate);
                html += `<tr>
                    <td>${flight.Airline + flight.FlightNumber.replace('/', '').split(',')[0]}</td>
                    <td>${getQuoteNum(startDate.getDate())}/${getQuoteNum(startDate.getMonth() + 1)}</td>
                    <td>${getQuoteNum(startDate.getHours())}:${getQuoteNum(startDate.getMinutes())} - ${getQuoteNum(endDate.getHours())}:${getQuoteNum(endDate.getMinutes())}</td>
                    <td>${flight.StartPoint} - ${flight.EndPoint}</td>
                    <td> ${i === 0 ? dtcCommon.formatMoney(totalFare) : ""} </td>
                </tr>`
                if (i === (flights.length - 1)) {
                    html += `<tr class="dtc-separate">
                        <td colspan="5">
                            <div style="display: none">--------------------------------------------------------</div>
                        </td>
                    </tr>`
                }
            });
            return html;
        }
    }
    const getQuoteHtml = function (airOption) {
        let fareOption;
        let flights;
        let flightOption;
        if (airOption) {
            fareOption = dtcCommon.getMinFareOption(airOption.ListFareOption);
            flightOption = airOption.ListFlightOption[0];
            flights = flightOption.ListFlight;
        }
        const html = getQuoteItemHtml(flights, airOption.ListFareOption,
            {
                Session: airOption.Session,
                AirlineOptionId: airOption.OptionId,
                FareOptionId: fareOption.OptionId,
                FlightOptionId: flightOption.OptionId,
                System: airOption.System,
                Journey: null,
                Airline: airOption.Airline
            });

        return html;
    }
    const getFlightHtml2 = function (flights, fareOption, listFareOption, selectedItem, verifyFlightIndex) {
        const id = dtcCommon.makeid(12);
        let isSelected = false;

        const minify = window.innerWidth > 576 && dtcCkbMinifyFlight.checked

        if (!listFareOption) {
            isSelected = true;
        }
        else {
            fareOption = dtcCommon.getMinFareOption(listFareOption);
        }
        let html = `<div class="dtc-air-row ${minify && !isSelected ? 'dtc-minify' : ''}">`;

        if (verifyFlightIndex !== undefined) {
            html += `<div class="dtc-air-option dtc-verified-option" 
                    data-verify-index="${verifyFlightIndex}">`;
        }
        else if (selectedItem) {
            html += `<div class="dtc-air-option" 
                    data-session="${selectedItem.Session}" 
                    data-air-option="${selectedItem.AirlineOptionId}" 
                    data-flight-option="${selectedItem.FlightOptionId}" 
                    data-system="${selectedItem.System}" 
                    data-airline="${selectedItem.Airline}"`;

            if (selectedItem.Journey)
                html += `data-journey="${selectedItem.Journey}" `;

            html += `data-fare-option="${selectedItem.FareOptionId}">`;
        }

        let totalFare = getTotalFare(fareOption);
        html += `<div class="dtc-flight-summ" onclick="dtcPlugin.showDetailFare('${id}')">`;

        //<div class="dtc-flight-connector-point dtc-sf-light">${dtcCommon.formatFlightDate(flight.StartDate)}</div>
        flights.forEach(flight => {
            const segmentPoints = flight.StopNum > 0 ? [...Array(flight.StopNum)].map(() => `<div class="dtc-flight-segment-point"></div>`).join("") : "";
            const timeFlight = dtcCommon.getTimeFlight(new Date(flight.StartDate), new Date(flight.EndDate));
            const displayAirline = dtcCommon.getAirline(flight.Airline === 'VN' ? flight.Operator : flight.Airline);
            const arlineName = displayAirline ? displayAirline.Name : flight.Airline;
            const flightLogo = flight.Airline === 'VN' ? flight.Operator : flight.Airline;
            if (minify && !isSelected) {
                html += `<div class="dtc-flight-info">
                        <div class="dtc-flight-air-logo">
                            <img loading="lazy" src="${dtcBaseUrl}img/airlines/${flightLogo}.gif" />
                        </div>
                        <div class="dtc-airline">
                            <span class="dtc-flight-time dtc-sf-bold">${timeFlight.TimeStart} - </span>
                            <span class="dtc-flight-time dtc-sf-bold">${timeFlight.TimeEnd}<span class="dtc-day-difference">${timeFlight.DayDifference > 0 ? `+${timeFlight.DayDifference}` : ''}</span></span>
                        </div>
                        <div>
                            <span class="dtc-flight-point">${flight.StartPoint}</span> - 
                            <span class="dtc-flight-point">${flight.EndPoint}</span>
                        </div>
                        <div class="dtc-flight-connector">
                            ${flight.StopNum > 0 ? 'Nối chuyến' : 'Bay thẳng'}
                        </div>
                        <div class="dtc-flighnum">
                            <div class="dtc-flight-number">${flight.FlightNumber.includes(flight.Airline) ? flight.FlightNumber.split(',')[0] : flight.Airline + flight.FlightNumber.split(',')[0]}</div>
                        </div>
                        <div class="dtc-flight-equipment">
                            ${!flight.ListSegment[0].Equipment ? '' : dtcCommon.getAircraft(flight.ListSegment[0].Equipment)}
                        </div>
                    </div>`;
            }
            else {
                html += `<div class="dtc-flight-info">
                        <div class="dtc-flight-air-logo">
                            <img loading="lazy" src="${dtcBaseUrl}img/airlines/${flightLogo}.gif" />
                            <div class="dtc-flight-mobile-info dtc-mobile-flight-number">${flight.Airline + flight.FlightNumber.replace('/', '').split(',')[0]}</div>
                        </div>
                        <div class="dtc-airline">
                            <div class="dtc-airline-name">${arlineName}</div>
                            <div class="dtc-aircraft dtc-sf-regular">${dtcCommon.formatFlightDate(flight.StartDate)}</div>
                        </div>
                        <div class="dtc-flight-startdate">
                            <div class="dtc-flight-time dtc-sf-bold">${timeFlight.TimeStart}</div>
                            <div class="dtc-flight-point dtc-sf-light">${flight.StartPoint}</div>
                        </div>
                        <div class="dtc-flight-connector" title="${flight.StopNum > 0 ? 'Nối chuyến' : 'Bay thẳng'}">
                            <div class="dtc-flight-total-time dtc-sf-regular">
                                ${dtcCommon.getDuration(flight.Duration)}
                            </div>
                            <div class="dtc-flight-connector-line">
                            ${segmentPoints ? `<div class="dtc-flight-segment-content">${segmentPoints}</div>` : ''}
                            </div>
                            <div class="dtc-flight-connector-wrap">
                                <div class="dtc-flight-connector-point dtc-sf-light dtc-flight-stop">${!flight.ListSegment[0].Equipment ? '' : dtcCommon.getAircraft(flight.ListSegment[0].Equipment)}</div>
                                <div class="dtc-t-startdate dtc-flight-connector-point">${dtcCommon.formatFlightDate(flight.StartDate)}</div>
                            </div>
                        </div>
                        <div class="dtc-flight-enddate">
                            <div class="dtc-flight-time dtc-sf-bold">${timeFlight.TimeEnd}<span class="dtc-day-difference">${timeFlight.DayDifference > 0 ? `+${timeFlight.DayDifference}` : ''}</span></div>
                            <div class="dtc-flight-point dtc-sf-light">${flight.EndPoint}</div>
                        </div>
                        <div class="dtc-flighnum">
                            <div class="dtc-flight-number">${flight.FlightNumber.includes(flight.Airline) ? flight.FlightNumber.split(',')[0] : flight.Airline + flight.FlightNumber.split(',')[0]}</div>
                            <div class="dtc-detail dtc-sf-light">
                                <span class="dtc-detail-icon"><img src="${dtcBaseUrl}img/information.png" width="14" /></span>
                                <span class="dtc-detail-txt">Chi tiết</span>
                            </div>
                        </div>
                    </div>`;
            }
        });
        html += '</div>';

        if (isSelected) {
            html += `<div class="dtc-total-fare dtc-selected-fare"><b>${dtcCommon.formatMoney(totalFare)}</b> ${fareOption.Currency}</div>`;
            html += `<div class="dtc-mobile-selected-info-wrap">
                <div class="dtc-mobile-selected-info">
                    <div class="dtc-selected-airline">${flights.length > 0 ? dtcCommon.getAirline(flights[0].Airline).Name : ""}</div>
                    <div class="dtc-selected-depart">${flights.length > 0 ? dtcCommon.formatFlightDate(flights[0].StartDate) : ""}</div>
                </div>
                <button type="button" class="dtc-btn dtc-fare-info mobile-btn-reselected" name="Unselect" data-journey="${selectedItem.Journey}" onclick="dtcFlight.unselectFlight(this)">
                    <img src="${dtcBaseUrl}img/refresh.png" width="20" /> <span class="fare-text">Chọn lại</span>
                </button>
            </div>`;
        } else {
            if (flights.length > 1) {
                html += `<div class="dtc-detail dtc-sf-light">
                            <span class="dtc-detail-icon"><img src="${dtcBaseUrl}img/information.png" width="14" /></span>
                            <span class="dtc-merge-detail-txt">Chi tiết</span>
                        </div>`
            }
            html += `<div class="dtc-flight-price-content">
            <div class="dtc-flight-fareclass"><div>${listFareOption.length > 0 ? listFareOption[0].FareFamily : ''}</div></div>
            <button type="button" class="dtc-btn dtc-total-fare" onclick="dtcFlight.selectFlightFare(this)">
                <b>${dtcCommon.formatMoney(totalFare)}</b> 
                <span class="dtc-currency">${fareOption.Currency}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="dtc-currency-dropicon" viewBox="0 0 19 20" fill="none">
                    <path d="M5.86625 7.29248L9.5 10.9262L13.1338 7.29248L14.25 8.41665L9.5 13.1666L4.75 8.41665L5.86625 7.29248Z" fill="#212529"/>
                </svg>`;

            html += '<div class="dtc-list-fare-option">';
            listFareOption.filter(item => !agentConfigs.CheapestOnly || item.OptionId === 0).forEach((item, index) => {
                totalFare = getTotalFare(item);
                html += `<div class="${item.Availability === 0 ? 'dtc-disable' : ''}${index === 0 ? 'dtc-active' : ''}" ${item.Availability === 0 ? '' : `onclick=dtcFlight.changeFareOption(this,${item.OptionId},${totalFare})`}>
                            <div class="dtc-line-1"><span class="dtc-farename">${item.FareFamily}</span><span><span class="dtc-price">${dtcCommon.formatMoney(totalFare)}</span><span class="dtc-currency">${item.Currency}</span></span></div>
                            <div class="dtc-line-2"><span class="dtc-farebasis">${item.FareBasis}</span><span class="dtc-remain">Còn <strong>${(item.Unavailable || item.Availability > 0) && !agentConfigs.HideAvailable ? item.Availability : ''}</strong> chỗ</span></div></div>`;
            });
            html += '</div></button></div>';
            html += `<div class="dtc-fselect-btn">
                        <button type="button" class="dtc-btn dtc-btn-primary dtc-btn-select-flight" name="selectFlight">
                        <span name="selectFlight" class="dtc-select-flight-text">Chọn</span>
                        <span name="selectFlight" class="dtc-mobile-flight-select">»</span>
                        </button>
                    </div>`;
        }
        html += '</div>';

        if (isSelected) {
            html += `<div class="dtc-mobile-selected-info dtc-selected-fare-info">
                <div>
                    <div class="dtc-detail-txt" onclick="dtcPlugin.showDetailFare('${id}')">
                        Chi tiết
                    </div>
                    <div class="dtc-selected-mobile-fare">
                        <div class="dtc-total-fare"><b>${dtcCommon.formatMoney(totalFare)}</b> ${fareOption.Currency}</div>
                        <button type="button" class="dtc-fare-info" name="Unselect" data-journey="${selectedItem.Journey}" onclick="dtcFlight.unselectFlight(this)">
                            <img src="${dtcBaseUrl}img/refresh.png" width="20" /> <span class="fare-text">Chọn lại</span>
                        </button>
                    </div>
                </div>
            </div>`;
        }

        html += `<div class="dtc-option-detail dtc-collapse" id="${id}">
                    <div>
                        <div class="dtc-detail-html"></div>
                        <div class="dtc-text-end"><button type="button" class="dtc-btn dtc-btn-light dtc-btn-sm" class="dtc-close-collapse" onclick="dtcCommon.collapse('${id}')">Đóng</button></div>
                    </div>
                </div>`;
        html += '</div>';
        return html;
    }
    const getFlightHtml = function (airOption, selectedItem) {
        let fareOption;
        let flights;
        let flightOption;
        let isSelected = false;
        if (airOption) {
            fareOption = dtcCommon.getMinFareOption(airOption.ListFareOption);
            flightOption = airOption.ListFlightOption[0];
            flights = flightOption.ListFlight;
        } else {
            isSelected = true;
            const data = listData.find(s => s.Session === selectedItem.Session);
            const group = data.ListGroup.find(s => s.Journey === selectedItem.Journey);
            airOption = group.ListAirOption.find(s => s.OptionId == selectedItem.AirlineOptionId);
            fareOption = airOption.ListFareOption.find(s => s.OptionId == selectedItem.FareOptionId);
            flightOption = airOption.ListFlightOption.find(s => s.OptionId == selectedItem.FlightOptionId);
            flights = flightOption.ListFlight;
        }
        let html;
        if (isSelected) {
            html = getFlightHtml2(flights, fareOption, null, selectedItem);
        } else {
            html = getFlightHtml2(flights, null, airOption.ListFareOption,
                {
                    Session: airOption.Session,
                    AirlineOptionId: airOption.OptionId,
                    FareOptionId: fareOption.OptionId,
                    FlightOptionId: flightOption.OptionId,
                    System: airOption.System,
                    Journey: null,
                    Airline: airOption.Airline
                });
        }

        return html;
    }
    const requestFlight = function (request, system, callback) {
        request.System = system;
        dtcCommon.postJson(dtcRequestUrl.SearchFlight, request, function (data) {
            let hasData = false;
            if (data.ListGroup?.length > 0) {
                listData.push(data);

                if (timeoutId)
                    clearTimeout(timeoutId);

                if (timeOut > 0) {
                    timeoutId = setTimeout(() => {
                        prinftData();
                    }, timeOut);
                }
                else prinftData();

                timeOut -= 100;
                hasData = true;
            }
            if (callback) {
                callback(hasData);
            }
        });
    }
    const getRequest = function () {
        formSearchMulti.classList.remove('dtc-invalid');
        formSearchOneway.classList.remove('dtc-invalid');
        const adt = dtcDisplaySearch.querySelector('[name="Adt"]').value;
        const chd = dtcDisplaySearch.querySelector('[name="Chd"]').value;
        const inf = dtcDisplaySearch.querySelector('[name="Inf"]').value;

        const oneWay = dtcDisplaySearch.querySelector('.dtc-search-input.dtc-one-way .dtc-search-input-oneway');
        let txtDepart = '[name="DepartDate"]';
        let txtReturn = '[name="ReturnDate"]';
        if (dtcCkbMonth.checked) {
            txtDepart = '[name="DepartMonth"]';
            txtReturn = '[name="ReturnMonth"]';
        }
        const list = [];
        if (oneWay) {
            if (dtcCommon.checkValidityForm(formSearchOneway)) {
                formSearchOneway.classList.add('dtc-invalid');
                return false;
            }
            const startPoint = oneWay.querySelector('[name="StartPoint"]').dataset.value;
            const endPoint = oneWay.querySelector('[name="EndPoint"]').dataset.value;
            const departDate = oneWay.querySelector(txtDepart).value;
            const returnDate = oneWay.querySelector(txtReturn).value;

            list.push({
                Leg: 0,
                StartPoint: startPoint,
                EndPoint: endPoint,
                DepartDate: departDate.replaceAll('/', '')
            });
            if (returnDate) {
                list.push({
                    Leg: 1,
                    StartPoint: endPoint,
                    EndPoint: startPoint,
                    DepartDate: returnDate.replaceAll('/', '')
                });
            }
        }
        else {
            if (dtcCommon.checkValidityForm(formSearchMulti)) {
                formSearchMulti.classList.add('dtc-invalid');
                return false;
            }

            const listRoute = dtcDisplaySearch.querySelectorAll('.dtc-list-route .dtc-search-input-multi');

            [...listRoute].forEach((item, index) => {
                const startPoint = item.querySelector('[name="StartPoint"]').dataset.value;
                const endPoint = item.querySelector('[name="EndPoint"]').dataset.value;
                const departDate = item.querySelector(txtDepart).value;

                list.push({
                    Leg: index,
                    StartPoint: startPoint,
                    EndPoint: endPoint,
                    DepartDate: departDate.replaceAll('/', '')
                });
            });
        }

        const allSystem = document.getElementById('dtc-option-air-all');
        let dtcs = '';

        const dataFormValue = document.getElementById('dtc-plugin').getAttribute('data-form') === 'vertical';
        if (!allSystem.checked || dataFormValue) {
            const firstFilterAirline = document.querySelector('.filter-airline');

            const checkedCheckboxes = [...firstFilterAirline.querySelectorAll('input[type="checkbox"]:not(#dtc-option-air-all):checked')];

            if (checkedCheckboxes.length > 0) {
                dtcs = checkedCheckboxes.map(s => s.value).join(',');
            }
        }
        let preferCabin = "";
        if (dataFormValue) {
            preferCabin = document.querySelector('[name="PreferCabinVertical"]:checked').value;
        } else {
            preferCabin = document.querySelector('[name="PreferCabin"]:checked').value;
        }

        requestSearch = {
            System: dtcs,
            Adt: Number(adt),
            Chd: Number(chd),
            Inf: Number(inf),
            Option: {
                DirectOnly: ckbDirectOnly.checked ? true : false,
                NearByAirport: ckbNearByAirport.checked ? true : false,
                PreferCabin: preferCabin,
                CombineMode: ckbCombined.checked ? 'fare' : 'flight'
            },
            ListRoute: list
        }

        return true;
    }
    const changeMobileBookBar = function () {
        if (step === 1) {
            const nextBtn = document.querySelector('.dtc-mobile-pax-ancil');
            if (nextBtn) nextBtn.style.display = "block";
            const bookBtn = document.querySelector('.dtc-mobile-pax-book');
            if (bookBtn) bookBtn.style.display = "block";
        }
        else if (step === 2) {
            const nextBtn = document.querySelector('.dtc-mobile-pax-ancil');
            if (nextBtn) nextBtn.style.display = "block";
            const bookBtn = document.querySelector('.dtc-mobile-pax-book');
            if (bookBtn) bookBtn.style.display = "none";
        }
        else if (step === 3) {
            const nextBtn = document.querySelector('.dtc-mobile-pax-ancil');
            if (nextBtn) nextBtn.style.display = "none";
            const bookBtn = document.querySelector('.dtc-mobile-pax-book');
            if (bookBtn) bookBtn.style.display = "block";
        }
    }
    const showSearch = function () {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', dtcRequestViewUrl.Index, false);
        xmlHttp.setRequestHeader('Authorization', document.getElementById('dtc-plugin').dataset.key);
        xmlHttp.send(null);

        const element = document.getElementById('dtc-plugin');
        element.innerHTML = '<div class="dtc-loader"></div>';
        element.innerHTML = xmlHttp.responseText;
        dtcCommon.execBodyScripts(element);
        dtcSearch.setValueSearch();

        const routes = urlParams.get('dtcr');

        if (routes) {
            const passengers = urlParams.get('dtcp') || '100';
            const directOnly = urlParams.get('dtcdo');
            const nearByAirport = urlParams.get('dtcna');
            const preferCabin = urlParams.get('dtcpc');
            const system = urlParams.get('dtcs');
            const combineMode = urlParams.get('dtcc');
            const arr = routes.split('-');
            const m = dtcCommon.maxPassenger(passengers[0], passengers[1], passengers[2]);

            const isSearchMonth = urlParams.get('dtcm') == 'true';
            requestSearch = {
                System: system,
                Adt: m.adt,
                Chd: m.chd,
                Inf: m.inf,
                Option: {
                    DirectOnly: directOnly ? true : false,
                    NearByAirport: nearByAirport ? true : false,
                    PreferCabin: preferCabin,
                    CombineMode: !combineMode ? 'fare' : 'flight'
                },
                ListRoute: arr.map((item, i) => {
                    return {
                        Leg: i,
                        StartPoint: item.substring(0, 3),
                        EndPoint: item.substring(3, 6),
                        DepartDate: item.substring(6, 14)
                    }
                }),
                IsSearchMonth: isSearchMonth
            };

            if (isSearchMonth) {
                dtcDisplaySearch.style.display = 'block';
                dtcDisplayFlights.style.display = 'block';
                dtcCommon.getView(dtcDisplayFlights, dtcRequestViewUrl.Month + '?dtcr=' + routes + '&dtcp=' + passengers);
                dtcDisplayFlights.className = 'visible';
            }
            else {
                showLoadingSearch();
                showFlights(1);
            }
        }

        dtcSearch.init();
        setTimeout(function () {
            dtcLoadForm.style.display = 'block';
        }, 100);

    }
    // const searchFlight = function () {
    //     if (!getRequest())
    //         return;

    //     const dtcrParam = requestSearch.ListRoute.map(s => s.StartPoint + s.EndPoint + s.DepartDate).join('-');
    //     const dtcpParam = `${requestSearch.Adt}${requestSearch.Chd}${requestSearch.Inf}`;

    //     let url = `dtcr=${dtcrParam}&dtcp=${dtcpParam}`;
    //     if (dtcCkbMonth.checked) {
    //         url += '&dtcm=true';
    //     }
    //     else {
    //         if (requestSearch.Option.DirectOnly)
    //             url += '&dtcdo=' + requestSearch.Option.DirectOnly;
    //         if (requestSearch.Option.NearByAirport)
    //             url += '&dtcna=' + requestSearch.Option.NearByAirport;
    //         if (requestSearch.Option.PreferCabin)
    //             url += '&dtcpc=' + requestSearch.Option.PreferCabin;
    //         if (requestSearch.System)
    //             url += '&dtcs=' + requestSearch.System;
    //         if (requestSearch.Option.CombineMode === 'flight')
    //             url += '&dtcc=' + false;
    //     }

    //     let searchUrl = document.getElementById('dtc-plugin').dataset.flightUrl;
    //     if (searchUrl) {
    //         if (searchUrl.indexOf('?') === -1) {
    //             window.location.href = searchUrl + `?${url}`;
    //         } else {
    //             window.location.href = searchUrl + '&' + url;
    //         }
    //     } else {
    //         window.location.href = location.origin + location.pathname + '?' + url;
    //     }
    // }
    const searchFlight = function () {
    if (!getRequest())
        return;

    const dtcrParam = requestSearch.ListRoute
        .map(s => s.StartPoint + s.EndPoint + s.DepartDate)
        .join('-');

    const dtcpParam = `${requestSearch.Adt}${requestSearch.Chd}${requestSearch.Inf}`;

    let url = `dtcr=${dtcrParam}&dtcp=${dtcpParam}`;
    if (dtcCkbMonth.checked) {
        url += '&dtcm=true';
    } else {
        if (requestSearch.Option.DirectOnly)
            url += '&dtcdo=' + requestSearch.Option.DirectOnly;
        if (requestSearch.Option.NearByAirport)
            url += '&dtcna=' + requestSearch.Option.NearByAirport;
        if (requestSearch.Option.PreferCabin)
            url += '&dtcpc=' + requestSearch.Option.PreferCabin;
        if (requestSearch.System)
            url += '&dtcs=' + requestSearch.System;
        if (requestSearch.Option.CombineMode === 'flight')
            url += '&dtcc=' + false;
    }

    let searchUrl = document.getElementById('dtc-plugin').dataset.flightUrl;
    if (searchUrl) {
        if (searchUrl.indexOf('?') === -1) {
            window.top.location.href = searchUrl + `?${url}`;
        } else {
            window.top.location.href = searchUrl + '&' + url;
        }
    } else {
        window.top.location.href = location.origin + location.pathname + '?' + url;
        
    }
};

    const showFlights = function (num) {
        step = 1;
        dtcBook.hideMobileCart();
        dtcFlight.delSelectd();
        hideSelectedPanel();
        hidePassengerPane();

        dtcDisplaySearch.style.display = 'block';
        dtcDisplayFlights.style.display = 'block';
        dtcDisplayPayment.style.display = 'none';
        //dtcPaxCart.style.display = 'none';
        if (num === 2) {
            showFlightPanel();
            return;
        }
        showLoadingSearch();
        toggleSearchOnResize();

        const domesticSystem = ['VN', 'VJ', 'QH', 'VU'];
        const allSystem = ['VN', 'VJ', 'QH', 'VU', '1G', '1A', '1S', 'FO', 'TR', 'JQ'];

        let domestic = true;
        requestSearch.ListRoute.forEach(s => {
            if (!dtcCommon.checkDomestic(s.StartPoint, s.EndPoint))
                domestic = false;
        });

        const systems = requestSearch.System && domestic ? requestSearch.System.split(',') : allSystem;
        let count = systems.length;
        const listResult = [];

        const noData = document.querySelector('.dtc-nodata');
        if (noData) noData.classList.remove('dtc-show');
        // disabled nút search chuyến bay
        [...document.querySelectorAll('.dtc-btn-search')].forEach(s => { s.disabled = true });
        systems.forEach(item => {
            // nếu là domestic thì search 4 hãng nội địa, nếu international thì search 11 hãng
            const searchCount = domestic ? domesticSystem.length : systems.length;
            if (!domestic || domesticSystem.indexOf(item) > -1) {
                requestFlight(requestSearch, item, function (hasValue) {
                    listResult.push(hasValue);
                    if (listResult.length === searchCount) {
                        if (listResult.every(n => !n)) {
                            const flight = document.querySelector('#dtcDisplayFlights');
                            if (flight) {
                                flight.classList.remove('dtc-loader');
                            }

                            const noData = document.querySelector('.dtc-nodata');
                            if (noData) {
                                noData.classList.add('dtc-show');
                                document.querySelector("#dtcSearchLoading").style.display = 'none';
                            }
                        }

                    }
                    if (--count === 0) {
                        setTimeout(function () {
                            document.querySelector("#dtcSearchLoading").style.display = 'none';
                            [...document.querySelectorAll('.dtc-header-loader')].forEach(s => { s.remove() });
                            [...document.querySelectorAll('.dtc-btn-search')].forEach(s => { s.disabled = false });
                        }, 500)
                    }
                });
            }
            else {
                if (--count === 0) {
                    document.querySelector("#dtcSearchLoading").style.display = 'none';
                    [...document.querySelectorAll('.dtc-header-loader')].forEach(s => { s.remove() });
                    [...document.querySelectorAll('.dtc-btn-search')].forEach(s => { s.disabled = false });
                }
            }
        });
        dtcCommon.initDropdown();
    }
    const showPassenger = function () {
        step = 2;
        printfSelectFlight();
        dtcCommon.scrollTo(document.querySelector('body'));
        const selected = dtcFlight.getSelected();

        if (selected.length !== requestSearch.ListRoute.length && selected.find(s => s.TripType === 'OW') || selected.length === 0) {
            showFlightPanel();
            hideSelectedPanel();
            hidePassengerPane();
            dtcBook.hideMobileCart();
            //dtcPaxCart.style.display = 'none';
            dtcDisplaySearch.style.display = 'block';
            return;
        }
        showSelectedPanel();
        dtcDisplaySearch.style.display = 'none';

        dtcCommon.getView(dtcDisplayPassenger, dtcRequestViewUrl.Passenger + '?' +
            'adt=' + requestSearch.Adt +
            '&chd=' + requestSearch.Chd +
            '&inf=' + requestSearch.Inf +
            '&time=' + requestSearch.ListRoute[requestSearch.ListRoute.length - 1].DepartDate +
            '&airline=' + selected.map(s => { return s.Airline }).join(','), () => {
                hideFlightPanel();
                showPassengerPane();

                document.querySelector('.dtc-passenger-content .dtc-selected-body').innerHTML = '';
                selected.forEach(item => {
                    const div = document.createElement('DIV');
                    div.className = 'dtc-selected-flight';
                    div.innerHTML = getFlightHtml(null, item);

                    document.querySelector('.dtc-passenger-content .dtc-selected-body').appendChild(div);
                });

                dtcBook.showPaxCart(selected.map(s => {
                    return getFareOption(s.Session, s.Journey, s.AirlineOptionId, s.FareOptionId)
                }));
                verifyFlight();
                document.getElementById("ckbUseInvoice").addEventListener("change", function () {
                    // onclick="dtcCommon.collapse('dtc-invoice', this)"
                    document.getElementById("dtc-invoice").classList.toggle("dtc-open");
                });
            });
    }
    const showPayment = function (orderId) {

        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', dtcRequestViewUrl.Payment + '?orderId=' + orderId + '&path=' + location.href, false);
        xmlHttp.setRequestHeader('Authorization', document.getElementById('dtc-plugin').dataset.key);
        xmlHttp.send(null);

        const element = document.getElementById('dtc-plugin');
        element.innerHTML = '<div class="dtc-loader"></div>';
        element.innerHTML = xmlHttp.responseText;
    }
    const toggleFilterOnResize = function () {
        const dtcFilter = document.querySelector('#dtcDisplayFilter');
        if (window.innerWidth < 576) {
            dtcFilter.classList.add('dtc-display-filter');
            dtcSearch.showMobileBar();
        }
        else {
            dtcSearch.hideMobileBar();
            dtcFilter.classList.remove('dtc-display-filter');
            document.querySelector("body").classList.remove("dtc-m-overflow-hidden");
        }
    }
    const toggleSearchOnResize = function () {
        const searchForm = document.querySelector("#dtc-search-form");
        if (window.innerWidth < 576) {
            searchForm?.classList.add('dtc-search-mobile');
        }
        else {
            searchForm?.classList.remove('dtc-search-mobile');
            document.querySelector("body").classList.remove("dtc-m-overflow-hidden");
        }
    }
    const showOption = function () {
        setTimeout(function () {
            document.querySelector("#dtc-option-select").classList.add("dtc-show");
            dtcSearch.addHiddenBody();
        }, 100)
    }
    const scrollFareOption = function () {
        const scrollContainers = document.querySelectorAll(".dtc-detail-list-fare");
        if (scrollContainers.length > 0) {
            scrollContainers.forEach(scrollContainer => {
                let isDown = false;
                let startX;
                let scrollLeft;

                scrollContainer.addEventListener("mousedown", (e) => {
                    isDown = true;
                    scrollContainer.classList.add("dtc-dragging");  // Thay đổi con trỏ thành "grabbing" khi kéo
                    startX = e.pageX - scrollContainer.offsetLeft;
                    scrollLeft = scrollContainer.scrollLeft;
                });

                scrollContainer.addEventListener("mouseleave", () => {
                    isDown = false;
                    scrollContainer.classList.remove("dtc-dragging");
                });

                scrollContainer.addEventListener("mouseup", () => {
                    isDown = false;
                    scrollContainer.classList.remove("dtc-dragging");
                });

                scrollContainer.addEventListener("mousemove", (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - scrollContainer.offsetLeft;
                    const walk = (x - startX) * 1.5; // Điều chỉnh tốc độ cuộn
                    scrollContainer.scrollLeft = scrollLeft - walk;
                });
            })
        }
    }
    const init = function () {
        // tạo list airport

        let dtcListAirport = document.querySelector("#dtcListAirport");
        if (!dtcListAirport) {
            const airportDiv = document.createElement("div");
            airportDiv.id = "dtcListAirport";
            document.body.appendChild(airportDiv);
        }

        window.addEventListener('click', function (event) {
            const element = event.target;

            switch (element.name || element.getAttribute("name")) {
                case 'selectFlight':
                    dtcFlight.selectFlight(element.closest('.dtc-air-option'));
                    break;
                case 'backToFlight':
                    dtcFlight.delSelectd();
                    break;
                case 'nextToService':
                    dtcBook.nextToService();
                    break;
                case 'BookFlight':
                    dtcBook.bookFlight();
                    break;
                default:
            }

            if (element.classList.contains('dtc-filter-only')) {
                dtcFilter.filterOnly(element);
            }

            if (element.classList.contains('dtc-close-collapse')) {
                dtcCommon.closeCollapse(element.closest('.dtc-collapse'));
            }

            if (element.classList.contains('dtc-tab')) {
                if (element.classList.contains('dtc-active'))
                    return;

                element.closest('.dtc-tabs-detail').querySelector('.dtc-tab.dtc-active').classList.remove('dtc-active');
                element.classList.add('dtc-active');

                const tabContent = document.getElementById(element.dataset.target);

                tabContent.closest('.dtc-tab-content').querySelector('.dtc-tab-pane.dtc-active').classList.remove('dtc-active');
                tabContent.classList.add('dtc-active');
            }
            if (element.closest('.dtc-tab')) {
                const tab = element.closest('.dtc-tab');
                if (tab.classList.contains('dtc-active'))
                    return;

                const tabDetail = tab.closest('.dtc-tabs-detail');
                if (tabDetail) {
                    tabDetail.querySelector('.dtc-tab.dtc-active').classList.remove('dtc-active');
                    tab.classList.add('dtc-active');
                }

                const tabContent = document.getElementById(tab.dataset.target);
                if (tabContent) {
                    tabContent.closest('.dtc-tab-content').querySelector('.dtc-tab-pane.dtc-active').classList.remove('dtc-active');
                    tabContent.classList.add('dtc-active');
                }
            }

            if (element.classList.contains('dtc-sort')) {
                if (element.classList.contains('dtc-checked')) {
                    element.classList.toggle('dtc-sort-desc');
                } else {
                    const checked = element.parentElement.querySelector('.dtc-sort.dtc-checked');
                    checked.classList.remove('dtc-checked');
                    checked.classList.remove('dtc-sort-desc');
                    element.classList.add('dtc-checked');
                }
                dtcFilter.filterAirOption();
            }

            if (element.hasAttribute('data-dismiss') || element.closest('[data-dismiss]')) {
                const dismiss = element.getAttribute('data-dismiss') || element.closest('[data-dismiss]').getAttribute('data-dismiss');

                if (dismiss === 'modal') {
                    //const modal = document.getElementById('dtc-modal');
                    const modal = element.closest('.dtc-modal');
                    modal.classList.add('dtc-hide');

                    setTimeout(function () {
                        modal.querySelector('.dtc-modal-header').style.display = 'none';
                        modal.querySelector('.dtc-modal-body').innerHTML = '<div class="dtc-loader"></div>';
                        modal.classList.remove('dtc-show');
                        modal.classList.remove('dtc-hide');
                    }, 300);
                }
            }

            const baggages = document.querySelectorAll('.dtc-baggage-head.dtc-show');
            if (baggages && baggages.length > 0) {
                baggages.forEach(baggage => {
                    if (baggage.dataset.outside) {
                        if (!baggage.closest('.dtc-baggage').contains(element)) {
                            baggage.classList.remove('dtc-show');
                        }
                    }
                    else {
                        if (!baggage.contains(element)) {
                            baggage.classList.remove('dtc-show');
                        }
                    }
                });
            }

            const services = document.querySelectorAll('.dtc-service-head.dtc-show');
            if (services && services.length > 0) {
                services.forEach(service => {
                    if (service.dataset.outside) {
                        if (!service.closest('.dtc-service').contains(element)) {
                            service.classList.remove('dtc-show');
                        }
                    }
                    else {
                        if (!service.contains(element)) {
                            service.classList.remove('dtc-show');
                        }
                    }
                });
            }
        });
        window.addEventListener('change', function (event) {
            const element = event.target;
            switch (element.name) {
                case 'SearchMonth':
                    {
                        if (element.checked)
                            listRoute.classList.add('dtc-month');
                        else
                            listRoute.classList.remove('dtc-month');
                    }
                    break;
                case 'ReturnDate':
                case 'ReturnMonth':
                    {
                        if (element.value) {
                            dtcSearch.changeItin(document.querySelector('[data-value="RT"]'));
                            dtcSearch.changeItin(document.querySelector('#dtc-radio-rt'));
                        }
                    }
                    break;
                case 'Surname':
                case 'GivenName':
                    {
                        element.value = element.value.toUpperCase().trim().replace(/\s+/g, ' ');
                        const parent = element.parentElement;
                        parent.querySelector('input[name="FullName"]').value = parent.querySelector('input[name="Surname"]').value.trim() + ' ' + parent.querySelector('input[name="GivenName"]').value.trim();
                    }
                    break;
                case 'FullName':
                    {
                        element.value = element.value.toUpperCase().trim().replace(/\s+/g, ' ');
                        const arr = element.value.split(' ');
                        const surname = arr[0];
                        const parent = element.parentElement;

                        parent.querySelector('input[name="Surname"]').value = surname;

                        if (arr.length > 1)
                            parent.querySelector('input[name="GivenName"]').value = element.value.substr(surname.length + 1);
                    }
                    break;
                case 'Baggage':
                    {
                        dtcBook.selectBaggage();
                    }
                    break;
                case 'Service':
                    {
                        dtcBook.selectService();
                    }
                    break;
                case 'MinifyFlight':
                    {
                        dtcFilter.filterAirOption();
                    }
                    break;
                default:
            }
            if (element.closest('#formInputPassenger')) dtcBook.changeNamePassenger();
            if (element.getAttribute("name") === "dtcPaymentMethod") {
                const listItem = element.closest('.dtc-payment-list').querySelector('.dtc-payment-list-item.dtc-active');
                if (listItem) {
                    listItem.classList.remove('dtc-active');
                    element.closest(".dtc-payment-list-item").classList.add('dtc-active');

                    const activePayment = document.querySelector(".dtc-payment-content-item.dtc-active");
                    if (activePayment) {
                        activePayment.classList.remove("dtc-active");
                    }

                    const target = element.closest(".dtc-payment-list-item").getAttribute("data-target");
                    const targetElement = document.getElementById(target);
                    if (targetElement) {
                        targetElement.classList.add('dtc-active');
                    }
                }
            }
        });
        const lang = urlParams.get('dtcl');
        const orderId = urlParams.get('dtco');

        if (orderId) {
            dtcPlugin.showPayment(orderId);
            return;
        }

        let masterDataSrc = dtcBaseUrl + 'data/master-vi.js';
        if (lang) {
            masterDataSrc = `${dtcBaseUrl}data/master-${lang}.js`;
        }

        loadScript(masterDataSrc)
            .then(() => {
                console.log("Script loaded successfully!");
                // Thực hiện các thao tác tiếp theo sau khi script được tải

                showSearch();
            })
            .catch(error => {
                console.error(error);
            });

        window.onresize = function () {
            let url = new URL(window.location.href);
            let params = new URLSearchParams(url.search);
            if (params.get("dtcr")) {
                toggleFilterOnResize();
                toggleSearchOnResize();
                dtcCommon.resizeCollapse();
            }
        };
        const script = document.createElement('script');
        script.classList.add('dtc-html2canvas');
        script.src = `${dtcBaseUrl}js/html-to-image.min.js`;
        script.async = true;
        document.head.appendChild(script);
    }
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Failed to load script ${src}`));
            document.head.appendChild(script);
        });
    }
    function showFlightPanel() {
        dtcDisplayFlights.style.display = 'block';
        setTimeout(function () {
            dtcDisplayFlights.classList.add('visible');
        }, 10);
    }
    function hideFlightPanel() {
        dtcDisplayFlights.classList.remove('visible');
        dtcDisplayFlights.style.display = 'none';
    }
    function showSelectedPanel() {
        dtcDisplayInput.style.display = 'block';
        setTimeout(function () {
            dtcDisplayInput.classList.add('visible');
        }, 10);
    }
    function hideSelectedPanel() {
        dtcDisplayInput.classList.remove('visible');
        dtcDisplayInput.style.display = 'none';
    }
    function showPassengerPane() {
        dtcDisplayPassenger.style.display = 'block';
        setTimeout(function () {
            dtcDisplayPassenger.classList.remove('hidden');
            dtcDisplayPassenger.classList.add('visible');
        }, 10);
    }
    function hidePassengerPane() {
        dtcDisplayPassenger.classList.remove('visible');
        dtcDisplayPassenger.style.display = 'none';
    }

    return {
        init,
        showSearch,
        getRequestSearch,
        showFlights,
        showPayment,
        showFlightHtml,
        getFlightHtml,
        showPassenger,
        printfSelectFlight,
        getFareOption,
        getFareRule,
        showOption,
        changeMobileBookBar,
        getItinType,
        scrollFareOption,
        showDetailFare,
        showQuoteFlightHtml,
        printQuoteData,
        searchFlight
    }
}();
dtcPlugin.init();




function addFlightHeader() {
  const form = document.querySelector("#dtc-search-form");
  if (!form) return false;

  // Nếu đã thêm header rồi thì bỏ qua
  if (form.querySelector(".flight-header")) return true;

  const header = document.createElement("div");
  header.className = "flight-header";
  header.innerHTML = `
    <h4 style="display: flex; align-items: center; gap: 8px; color: white; font-weight: 600;">
      <svg width="30" height="28" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M404 207.9L204.7 104.2C196.7 100.1 187.4 99.4 179 102.5L137.9 117.5C127.6 121.2 124.1 133.9 130.8 142.5L232.3 270.4L132.1 306.8L72 270.2C65.8 266.4 58.2 265.7 51.3 268.1L35 274.1C25.6 277.5 21.6 288.6 26.7 297.2L80.3 389C95.9 415.7 128.4 427.4 157.4 416.8L170.3 412.1L170.3 412.1L568.7 267.1C597.8 256.5 612.7 224.4 602.2 195.3C591.7 166.2 559.5 151.3 530.4 161.8L404 207.9zM64.2 512C46.5 512 32.2 526.3 32.2 544C32.2 561.7 46.5 576 64.2 576L576.2 576C593.9 576 608.2 561.7 608.2 544C608.2 526.3 593.9 512 576.2 512L64.2 512z"/>
      </svg>
      Tìm Kiếm Chuyến Bay
    </h4>
  `;

  form.prepend(header);
  return true;
}

// Polling chờ form #dtc-search-form xuất hiện
const waitForForm = setInterval(() => {
  if (addFlightHeader()) clearInterval(waitForForm);
}, 300);

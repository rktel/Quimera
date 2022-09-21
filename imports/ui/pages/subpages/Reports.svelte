<script>
    import { Meteor } from "meteor/meteor";
    const XLSX = require("xlsx");
    import {s_user} from '../../../api/stores';
    import { clickOutside } from '../../../tools';

    const fClickOutside = ()=> bDropHeaders = false
    let user = undefined;
    s_user.subscribe(newValue => user = newValue);
    let bLeftPanel = true;
    let dateReportSelected = 0;
    let startDay, endDay, imei;
    let reports = [];
    let headers = [];
    let bDropHeaders = false;
    const fToggleLeft = () => bLeftPanel = !bLeftPanel;
    const fCreateExcel = (_) => {

     
        const data = document.querySelector("#report-table");

        var file = XLSX.utils.table_to_book(data, {raw: true});

        XLSX.write(file, { bookType: 'xlsx', bookSST: true, type: 'base64' });

        XLSX.writeFile(file, imei + '.xlsx');
    }

    const fGetReport = () => {
        let a, b;
        if(Number(imei)){
            a = new Date();
            b = new Date();
            if(dateReportSelected===2){
                a = new Date(startDay);
                b = new Date(endDay);              
            }
            Meteor.call('users.reports.set.imei',imei);
            Meteor.call('getReport',dateReportSelected, imei,a,b, (error, result)=>{
                if(!error && result){
                    headers = result.headers;
                    reports = result.reports;
                    sort.sortedData = result.reports;
                    pagination.fPageAction();
                }
            })
        }
    };


    let pagination = {
        itemsPerPage: 500,
        pageSelected:1,
        fNumbers: (length)=>{
            let array = [];
            for (let index = 0; index < length; index++) {
                array[index] = index + 1;
            }
            return array;
        },
        fPageAction: () => {
            pagination.totalOfItems = reports.length;
            pagination.totalOfPages = Math.ceil(pagination.totalOfItems/pagination.itemsPerPage);
            pagination.pages = pagination.fNumbers(pagination.totalOfPages);
            pagination.start = (pagination.pageSelected - 1)* pagination.itemsPerPage,
            pagination.end = (pagination.pageSelected - 1)* pagination.itemsPerPage + pagination.itemsPerPage 
            pagination.data = reports.slice(pagination.start, pagination.end );
            pagination.itemsPerPageArray = [100, 200, 500, 1000, 2000, 5000];
            sort.sortedData = pagination.data;
            //sort.mainAction(sort.selectedHeader);
        },
        fItemsPerPageAction: () => {
            pagination.pageSelected = 1;
            pagination.fPageAction();
        }
    };

    let sort = {
        selectedHeader : { label: 'Fecha Servidor', state: true, type:1},
        ascendingOrder : false,
        sortByNumber : (header) => {
            sort.sortedData = sort.sortedData.sort((obj1,obj2)=>{
                return sort.ascendingOrder ? obj1[header.label] - obj2[header.label] :  obj2[header.label] - obj1[header.label];
            });
            sort.selectedHeader = header;
        },
        sortByString : (header) => {
            sort.sortedData = sort.sortedData.sort((obj1,obj2)=>{
                if (obj1[header.label] < obj2[header.label]){
                    return -1;
                }else if(obj1[header.label] > obj2[header.label]){
                    return 1;
                }
                return 0;
            });
            if(!sort.ascendingOrder){
                sort.sortedData = sort.sortedData.reverse();
            }
            sort.selectedHeader = header;
        },mainAction : (header) => {
            (header.type === 0)?sort.sortByNumber(header):sort.sortByString(header)
        }
    }

    if(user && user.profile && user.profile.reports){
        imei = user.profile.reports.imei
    }

</script>
<!-- CONTAINER -->
<div class="dark:bg-dark-700 bg-dark-50 h-[calc(100%_-_40px)] flex">
    <!-- LEFT -->   
    {#if bLeftPanel}
        <div class="grid grid-rows-[50px,1fr] shadow-lg basis-[300px] text-xs">

            <!-- BAR -->
            <div class="flex justify-end px-4 items-center"> 

            </div>
            <!-- BAR_END -->
            <!-- OPTIONS -->
            <div class="flex flex-col p-10 gap-6">
                <div>
                    <h1 class="text-dark-700 dark:text-dark-100 font-bold ">SELECCIONE OPCION</h1>
                </div>
                <div class="grid grid-rows-[auto,auto] gap-1">
                    <label for="dateReportSelect" class="text-dark-700 dark:text-dark-300 ">Fecha:</label>
                    <select name="dateReportSelect" id="dateReportSelect" bind:value={dateReportSelected} class="h-8 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500 bg-white">
                        <option value={0}>Hoy</option>
                        <option value={1}>Ayer</option>
                        <option value={2}>Intervalo</option>
                    </select> 
                </div>
                {#if dateReportSelected === 2}
                <div class="grid grid-rows-[auto,auto] gap-1">
                    <label for="date-start" class="text-dark-700 dark:text-dark-300 "
                        >Inicio:</label>

                        <input
                        class="h-8 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500"
                        type="date"
                        name="date-start"
                        id="date-start"
                        bind:value={startDay}
                    />
                </div>    
                <div class="grid grid-rows-[auto,auto] gap-1">
                    <label for="date-end" class="text-dark-700 dark:text-dark-300 "
                        >Fin:</label>

                        <input
                        class="h-8 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500"
                        type="date"
                        name="date-end"
                        id="date-end"
                        bind:value={endDay}
                    />
                </div>               
                {/if}
                <div class="grid grid-rows-[auto,auto] gap-1">
                    <label for="imei" class="text-dark-700 dark:text-dark-300 "
                        >IMEI:</label>
                        <input
                        class="h-8 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500"
                        type="text"
                        name="imei"
                        id="imei"
                        bind:value={imei}
                    />
                </div>
                <div>
                    <button disabled={!imei} on:click={fGetReport} class="bg-alfa-600 shadow uppercase  text-white  rounded w-full h-8" > consultar</button>
                </div>
                {#if reports[0]}
                <div class="flex">
                    <button class="bg-beta-600 shadow uppercase  text-white  rounded w-full h-8" on:click={fCreateExcel}>
                        descargar
                    </button>
      
                    <!-- <p class="text-gray-600  text-center mt-1">Se incluiran todos los campos {brawData?"+ raw data":""}</p> -->
                </div>
                {/if}
            </div>
            <!-- OPTIONS_END -->

        </div>
    {/if}
    <!-- LEFT_END -->

    <!-- RIGHT -->
    <div class="overflow-hidden flex-1 p-5 h-full">
        {#if headers[0]}
            <!-- BAR ACTION -->
            <div class="h-[30px] flex gap-2 bg-dark-300 dark:bg-dark-800 dark:border-dark-800  border-dark-50 border-b">
                <!-- toggle all left panels -->
                <button class="h-[30px] px-2" on:click={fToggleLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-dark-500 dark:fill-dark-200" viewBox="0 0 512 512"><path d="M456 224H312c-13.3 0-24-10.7-24-24V56c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l40 40L442.3 5.7C446 2 450.9 0 456 0s10 2 13.7 5.7l36.7 36.7C510 46 512 50.9 512 56s-2 10-5.7 13.7L433 143l40 40c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8zm0 64c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-40 40 73.4 73.4c3.6 3.6 5.7 8.5 5.7 13.7s-2 10-5.7 13.7l-36.7 36.7C466 510 461.1 512 456 512s-10-2-13.7-5.7L369 433l-40 40c-6.9 6.9-17.2 8.9-26.2 5.2s-14.8-12.5-14.8-22.2V312c0-13.3 10.7-24 24-24H456zm-256 0c13.3 0 24 10.7 24 24V456c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-40-40L69.7 506.3C66 510 61.1 512 56 512s-10-2-13.7-5.7L5.7 469.7C2 466 0 461.1 0 456s2-10 5.7-13.7L79 369 39 329c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8H200zM56 224c-9.7 0-18.5-5.8-22.2-14.8s-1.7-19.3 5.2-26.2l40-40L5.7 69.7C2 66 0 61.1 0 56s2-10 5.7-13.7L42.3 5.7C46 2 50.9 0 56 0s10 2 13.7 5.7L143 79l40-40c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2V200c0 13.3-10.7 24-24 24H56z"/></svg>
                </button>
              <!-- toggle all left panels_end -->
              <!-- consultar -->
              <button class="h-[30px] px-2 bg-white" on:click={fGetReport}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-alfa-700 dark:fill-dark-100" viewBox="0 0 512 512"><path d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z"/></svg>
              </button>
              <!-- consultar_end -->
                <!-- select columns -->
                <div class="flex">
                    <button class="h-[30px] px-2" on:click={_ => bDropHeaders=!bDropHeaders}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-dark-500 dark:fill-dark-200" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z"/></svg>
                    </button>
                    {#if bDropHeaders}
                        <div class="absolute bg-dark-100 z-50 mt-[30px] text-xs text-dark-500 shadow-lg flex flex-col w-[160px] dark:bg-dark-800 dark:text-dark-300" use:clickOutside on:click_outside={fClickOutside}>
                            {#each headers as header }
                                <div class="flex justify-between p-2">
                                    <div>
                                        {header.label}
                                    </div>
                                    <div>
                                        <input type="checkbox" bind:checked={header.state}>
                                    </div>
                                </div>
                            {/each}
                        </div>                        
                    {/if}

                </div>
                <!-- select columns_end -->

                <!-- pagination -->
                <div class="flex text-xs items-center gap-2">
                    <div class="px-2">
                        <span class="text-dark-500 dark:text-dark-200">
                            Filas por paginax :
                        </span>
                        <select bind:value={pagination.itemsPerPage} class="text-xs text-dark-500 bg-dark-300 dark:text-dark-200 dark:bg-dark-800" on:change={pagination.fItemsPerPageAction}>
                            {#each pagination.itemsPerPageArray as itemsPerPage}
                              <option class="text-xs text-dark-500" value="{itemsPerPage}" >{itemsPerPage}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="px-2">
                        <span class="text-dark-500 dark:text-dark-200">
                            Pagina :
                        </span>
                        <select bind:value={pagination.pageSelected} class="text-xs text-dark-500 bg-dark-300 dark:text-dark-200 dark:bg-dark-800" on:change={pagination.fPageAction}>
                            {#each pagination.pages as page}
                              <option class="text-xs text-dark-500" value="{page}" >{page}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="px-2">
                        <span class="text-dark-500 dark:text-dark-200">
                            {pagination.totalOfItems} filas en total
                        </span>
                    </div>
                </div>
                <!-- pagination_end -->
            </div>
            <!-- BAR ACTION_END -->

            <!-- TABLE CONTAINER -->
            <div class="overflow-auto h-[calc(100%_-_30px)]">
                <table class="text-xs" id="report-table">
                    <thead class="bg-dark-200 dark:bg-dark-800 text-left sticky top-0">
                        <tr class="font-medium text-dark-700 dark:text-white h-10">
                            <th class="pl-5 whitespace-nowrap">#</th>
                            {#each headers as header}
                                {#if header.state}
                                <th class="pl-5 whitespace-nowrap" on:click={_ => sort.mainAction(header)}>
                                    {header.label}
                                    <span on:click={()=> sort.ascendingOrder = !sort.ascendingOrder} class="px-2 cursor-pointer {header.label === sort.selectedHeader.label?'visible':'invisible'}">
                                        {@html sort.ascendingOrder? "&uarr;": "&darr;"}
                                    </span>
                                </th>
                                {/if}
                            {/each}
                        </tr>
                    </thead>
                    <tbody>
                        {#each sort.sortedData as report,i}
                        <tr class="text-dark-600 dark:text-dark-200 dark:bg-dark-700 h-8 border-b border-dark-200 dark:border-dark-600 {i%2?'bg-dark-100 dark:bg-dark-600':''}">
                            <td class="pl-5 whitespace-nowrap">{i+1}</td>
                            {#each headers as header }
                                <td class="{header.state?'':'hidden'} pl-5 whitespace-nowrap {header.label ==='Raw data'? 'pr-5':''}">{report[header.label] === undefined ? "": report[header.label] }</td>
                            {/each}
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <!-- TABLE CONTAINER_END -->
        {/if}
    </div>
    <!-- RIGHT_END -->
</div>
<!-- CONTAINER_END -->
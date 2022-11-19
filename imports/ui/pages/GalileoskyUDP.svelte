<script>
    import { Meteor } from 'meteor/meteor';
    import { clickOutside } from '../../tools' 
    import { s_user } from '../../api/stores';
    import { onDestroy } from "svelte";
    import { formatSpecial} from '../../tools'
    import GalileoskyRealTime from './subpages/GalileoskyRealTime.svelte';

    const fClickOutside = ()=> bUserOptions = false
    const subpages = [
         {index:0, name:" Galileosky UDP: 2222", component: GalileoskyRealTime},
    ]
    let subpageOn = subpages[0];
    const fLoadSubpage = subpage => subpageOn = subpage;
    let user = undefined;
    s_user.subscribe(newValue => user = newValue);
    let bUserOptions = false
    const fLogout = () => Meteor.logout();
    let now = formatSpecial(new Date());
    const fSetNow = () => now = formatSpecial(new Date());
    let timer = setInterval(fSetNow, 1 * 1000);
    onDestroy((_) => clearInterval(timer));
    const active = 'text-dark-800 font-bold dark:text-dark-100'
</script>

<!-- CONTAINER -->
<div class="h-screen flex flex-col">
    <!-- BAR -->
    <div class="h-[40px] grid grid-cols-[auto,1fr,auto] bg-dark-50 dark:bg-dark-700 border-b border-beta-500">
        <!-- SELECT SUBPAGE -->
        <div class="flex text-dark-500 h-[40px] overflow-x-auto">
            {#each subpages as $subpage }
            <button class="text-sm min-w-[120px] {$subpage.index === subpageOn.index?active:''}" on:click="{_=>fLoadSubpage($subpage)}">{$subpage.name}</button>
            {/each}
        </div>
        <!-- SELECT SUBPAGE_END -->
        <!-- TOOL -->
        <div class="flex items-center justify-end px-5 h-[40px]">
            <span class="text-dark-500 dark:text-white text-xs font-bold hidden sm:block">
                {now}
            </span>
        </div>
        <!-- TOOL_END -->
        <!-- USER AVATAR -->
        <div class="flex items-center px-5 h-[40px]">
            <button on:click={_=>bUserOptions =!bUserOptions} title={user&&user.profile?`${user.profile.firstname} (${user.username})`:""} class="h-[23px] w-[23px] text-white text-sm font-bold shadow hover:ring bg-beta-700 rounded-full">{user&&user.profile?user.profile.firstname.charAt(0):''}</button>
        </div>
        <!-- USER AVATAR_END -->
    </div>
    <!-- BAR_END -->
    <!-- SUBPAGE -->
    <svelte:component this="{subpageOn.component}"></svelte:component>
    <!-- SUBPAGE_END -->
</div>
<!-- CONTAINER_END -->

<!-- USER OPTIONS -->
{#if bUserOptions}
    <div class="dark:bg-dark-700 bg-dark-50 shadow-lg absolute top-[40px] right-0 z-40 w-[260px] grid grid-rows-[auto,auto]" use:clickOutside on:click_outside={fClickOutside}>
        <div class="bg-dark-100 dark:bg-dark-800 flex flex-col items-center p-5 gap-2">
            <p class="text-dark-800 font-medium dark:text-dark-50">{user?user.username:""}</p>
            <span class="h-[30px] w-[30px] text-white text-xl bg-beta-700 text-center font-bold shadow rounded-full">{user&&user.profile?user.profile.firstname.charAt(0):''}</span>
            <p class="text-dark-800 dark:text-dark-50 text-sm">{user&&user.profile?user.profile.fullname:""}</p>
        </div>
        <div class="flex flex-col">
            <button class="text-dark-600 dark:text-dark-300 flex justify-between px-5 py-4 items-center bg-dark-100 dark:bg-dark-800" on:click={fLogout}>
                <span class="text-sm">Cerrar sesión</span> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="h-5 w-5 fill-dark-600 dark:fill-dark-300"><path d="M208 96c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zM123.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L281 232.7l-15.3-36.8C248.5 154.8 208.3 128 163.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1L68.7 398 9.4 457.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L116.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM550.6 153.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L530.7 224H384c-17.7 0-32 14.3-32 32s14.3 32 32 32H530.7l-25.4 25.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l80-80c12.5-12.5 12.5-32.8 0-45.3l-80-80zM392 0c-13.3 0-24 10.7-24 24V72c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24zm24 152c0-13.3-10.7-24-24-24s-24 10.7-24 24v16c0 13.3 10.7 24 24 24s24-10.7 24-24V152zM392 320c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24s24-10.7 24-24V344c0-13.3-10.7-24-24-24zm24 120c0-13.3-10.7-24-24-24s-24 10.7-24 24v48c0 13.3 10.7 24 24 24s24-10.7 24-24V440z"/></svg>
            </button>
        </div>
    </div>
{/if}
<!-- USER OPTIONS_END -->
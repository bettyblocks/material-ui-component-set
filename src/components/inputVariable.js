(() => ({
  name: 'inputVariable',
  type: 'INPUT_VARIABLE',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { getActionInput, useText, env } = B;
    const { actionInputId, defaultValue } = options;
    const isDev = env === 'dev';
    const [currentValue, setCurrentValue] = useState(useText(defaultValue));
    const actionInput = getActionInput(actionInputId);

    useEffect(() => {
      if (isDev) {
        setCurrentValue(useText(defaultValue));
      }
    }, [isDev, defaultValue]);

    return (
      <div className={classes.root}>
        <input
          name={actionInput && actionInput.name}
          type="hidden"
          value={currentValue}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Variable"
          viewBox="0 0 16 16"
          color="grey700"
        >
          <g fill-rule="evenodd">
            <path d="M11.5492415,5.70109388 C11.5492415,6.06262686 11.4414053,6.35329456 11.2312348,6.56468926 C11.0166627,6.77968727 10.7580759,6.88778683 10.4532736,6.88778683 C10.272813,6.88778683 10.0923524,6.86496581 9.91189185,6.81331825 C9.73583274,6.76167068 9.58068066,6.71482754 9.45193744,6.66317997 C9.39141712,6.71002311 9.30118683,6.80851382 9.18124656,6.96345652 C9.0646074,7.11839923 8.93146271,7.3057718 8.7807121,7.52557424 C8.91825827,8.16456275 9.03049595,8.61978201 9.11192329,8.88642759 C9.1977521,9.15427428 9.27587833,9.4293276 9.35290419,9.70317982 C9.41782598,9.92418337 9.51135738,10.0971427 9.64120097,10.2196555 C9.76554272,10.3457716 9.96360921,10.4070281 10.2343001,10.4070281 C10.3366344,10.4070281 10.4576751,10.3818048 10.6084257,10.3409672 C10.7580759,10.3037329 10.8791166,10.2616942 10.9737483,10.2196555 L10.8483062,10.7805721 C10.4708795,10.960738 10.1396683,11.0868542 9.86017449,11.1673283 C9.57627918,11.2466013 9.32319422,11.28864 9.10312033,11.28864 C8.94026566,11.28864 8.7807121,11.2706234 8.62666038,11.2369925 C8.46710681,11.2045626 8.32515916,11.1433062 8.19641594,11.0544243 C8.05446829,10.9655425 7.93452802,10.8478341 7.83989625,10.712109 C7.740863,10.5751829 7.65943567,10.3818048 7.59011239,10.1331758 C7.54279651,9.98303757 7.4998821,9.80647496 7.46136917,9.60949353 C7.42285624,9.41731654 7.38434332,9.24315614 7.34583039,9.09301786 C7.23359271,9.27198269 7.15656685,9.40290326 7.10484949,9.49178512 C7.0575336,9.57946588 6.98490922,9.70317982 6.89027745,9.86292695 C6.58437475,10.3649893 6.32248683,10.7253212 6.10351332,10.9415203 C5.88013833,11.1577195 5.61274857,11.2610146 5.30794624,11.2610146 C5.07136682,11.2610146 4.87440069,11.1757361 4.71044565,11.0075812 C4.54759098,10.8322197 4.46616364,10.6136183 4.46616364,10.3361628 C4.46616364,9.96622208 4.568498,9.67435327 4.77976892,9.45935526 C4.99434096,9.24315614 5.2518274,9.13385547 5.56213157,9.13385547 C5.74259216,9.13385547 5.91865126,9.1590787 6.09030889,9.20592184 C6.25756504,9.25756941 6.4171186,9.30921698 6.56346774,9.36566897 C6.62288768,9.3140214 6.71311798,9.22033512 6.83415861,9.07019684 C6.95409888,8.92846631 7.0828421,8.74589816 7.22478975,8.52849793 C7.09604653,7.97238575 6.99261181,7.54959636 6.91118447,7.26373308 C6.82975713,6.98147312 6.7483298,6.70041426 6.66690246,6.4193554 C6.59757919,6.19835186 6.49854594,6.02419146 6.36540124,5.90287973 C6.23665802,5.78036689 6.042993,5.72031158 5.78110509,5.72031158 C5.66446593,5.72031158 5.54012418,5.7431326 5.39817653,5.78517132 C5.25622888,5.82721004 5.13628861,5.87044986 5.04165684,5.90768415 L5.17040006,5.33956091 C5.51481569,5.17020493 5.83722393,5.04408878 6.14642773,4.96481577 C6.45123006,4.87953723 6.70981687,4.83749851 6.91558595,4.83749851 C7.10484949,4.83749851 7.26330268,4.85191178 7.39754775,4.87953723 C7.53069245,4.90836378 7.6726401,4.97322351 7.81788886,5.0681109 C7.95543504,5.16179719 8.07647567,5.27350007 8.17881003,5.4152306 C8.27784328,5.55576003 8.36367209,5.7431326 8.42859389,5.98695716 C8.47590977,6.15631314 8.51882418,6.32927244 8.55733711,6.50823727 C8.59585004,6.68600099 8.62666038,6.84094369 8.65637035,6.96826095 C8.73339621,6.83613926 8.82032539,6.70041426 8.90615421,6.55508041 C8.98758155,6.41455098 9.0646074,6.28723372 9.12512772,6.17913416 C9.41782598,5.67707176 9.68411538,5.31193547 9.91629333,5.09573635 C10.1484713,4.8747328 10.4103592,4.76783435 10.7063586,4.76783435 C10.942938,4.76783435 11.145406,4.85191178 11.3082606,5.02487108 C11.4678142,5.19903148 11.5492415,5.42363835 11.5492415,5.70109388"></path>
            <path d="M2.29403443,7.54892908 C2.29403443,8.53864061 2.40627211,9.40223598 2.62524562,10.1337097 C2.75398884,10.5709123 3.03348267,11.2519396 3.4461212,12.1479648 L2.41837617,12.1479648 C1.93751474,11.3119949 1.60630354,10.6549898 1.44344887,10.2045749 C1.14634913,9.41184483 1,8.50621074 1,7.49247709 C1,7.1081231 1.03411145,6.7045514 1.09903325,6.28656644 C1.16395504,5.86978258 1.27069087,5.44699319 1.42144148,5.02060048 C1.53698027,4.6770841 1.64921795,4.40563409 1.75265268,4.20865267 C1.81207262,4.09094426 1.94631769,3.8471197 2.14328382,3.5 L3.2051403,3.5 C2.9641594,4.04410112 2.77929734,4.49451595 2.67696298,4.83683123 C2.42277765,5.65838788 2.29403443,6.56402198 2.29403443,7.54892908"></path>
            <path d="M13.7103671,7.54892908 C13.7103671,8.53864061 13.5981294,9.40223598 13.3791559,10.1337097 C13.2504126,10.5709123 12.9709188,11.2519396 12.5538788,12.1479648 L13.5816238,12.1479648 C14.0624853,11.3119949 14.3936965,10.6549898 14.5576515,10.2045749 C14.8536509,9.41184483 15,8.50621074 15,7.49247709 C15,7.1081231 14.97029,6.7045514 14.9053682,6.28656644 C14.8404464,5.86978258 14.7337106,5.44699319 14.58296,5.02060048 C14.4630197,4.6770841 14.350782,4.40563409 14.2517488,4.20865267 C14.1912285,4.09094426 14.0536823,3.8471197 13.8611177,3.5 L12.7992612,3.5 C13.0402421,4.04410112 13.2207027,4.49451595 13.3274385,4.83683123 C13.5816238,5.65838788 13.7103671,6.56402198 13.7103671,7.54892908"></path>
          </g>
        </svg>
      </div>
    );
  })(),
  styles: B => {
    const { theme } = B;
    return {
      root: {
        width: '16px',
        height: '16px',
        color: 'grey',
      },
    };
  },
}))();

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

// https://datatables.net/examples/data_sources/js_array
// https://naver.github.io/billboard.js/demo/#Chart.LineChart

window.onload = () => {
    let arrX = ["x"];
    let arrY = ["weight (kg)"];

    const dataSet = [
        [Date.UTC(2016, 6, 24), 83.9],
        [Date.UTC(2016, 9, 24), 90],
        [Date.UTC(2016, 11, 6), 87.5],
        [Date.UTC(2017, 0, 4), 87.1],
        [Date.UTC(2017, 1, 27), 87.9],
        [Date.UTC(2017, 5, 17), 79.8],
        [Date.UTC(2017, 7, 26), 85.0],
        [Date.UTC(2017, 11, 24), 83],
        [Date.UTC(2018, 0, 1), 84.2],
        [Date.UTC(2018, 0, 8), 82],
        [Date.UTC(2018, 3, 1), 83.5],
        [Date.UTC(2018, 10, 1), 85.1],
        [Date.UTC(2019, 1, 10), 78.7],
        [Date.UTC(2019, 6, 29), 84.9],
        [Date.UTC(2019, 10, 30), 86.2],
        [Date.UTC(2019, 11, 28), 85.9],
        [Date.UTC(2020, 1, 18), 89.4],
        [Date.UTC(2020, 5, 29), 89.7],
        [Date.UTC(2020, 6, 25), 92.5],
        [Date.UTC(2020, 9, 24), 93.6],
        [Date.UTC(2020, 10, 20), 90.0],
        [Date.UTC(2021, 5, 13), 88.4],
        [Date.UTC(2022, 4, 2), 99.8],
        [Date.UTC(2022, 5, 11), 104.3],
        [Date.UTC(2023, 5, 3), 104.1],
        [Date.UTC(2023, 10, 4), 105.2],
        [Date.UTC(2024, 1, 19), 107.2],
        [Date.UTC(2024, 2, 26), 106],
        [Date.UTC(2024, 5, 1), 111.3],
        [Date.UTC(2024, 9, 14), 108.5],
        [Date.UTC(2025, 1, 14), 111.7],
        [Date.UTC(2025, 3, 12), 105.5],
        [Date.UTC(2025, 4, 10), 104.9]
    ];

    // ----- dataTables -----
    new DataTable('#arrayWeight', {
        columns: [
            {
                title: 'Weight (kg)',
                data: 1
            },
            {
                title: 'Date',
                data: 0,
                render: function (data, type, row) {
                    const timestamp = typeof data === 'number' ? data : Date.parse(data);
                    if (isNaN(timestamp)) return 'Invalid Date';

                    if (type === 'display' || type === 'filter') return formatDate(timestamp);
                    return timestamp;
                }
            },
        ],
        columnDefs: [
            {
                targets: 0, // Colonne "Weight"
                className: 'text-left' // Aligner à gauche
            }
        ],
        data: dataSet
    });

    // ----- billboard -----
    const copyDataSet = JSON.parse(JSON.stringify(dataSet));
    copyDataSet.forEach(r => {
        arrX.push(r[0]);
        arrY.push(r[1]);

        let div1 = document.createElement('div');
        div1.innerHTML = new Date(r[0]).toLocaleDateString();
        r[0] = div1;

        let div2 = document.createElement('div');
        div2.innerHTML = r[1];
        r[1] = div2;
    })
    bb.generate({
        data: {
            x: "x",
            columns: [
                arrX,
                arrY
            ],
            type: "line", // for ESM specify as: line()

        },
        axis: {
            x: {
                type: "timeseries",
                tick: {
                    format: "%Y-%m-%d"
                }
            }
        },
        bindto: "#graphWeight"
    });
};

const formatDate = (timestamp) => {
    const d = new Date(timestamp);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

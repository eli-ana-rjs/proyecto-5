const main = async() => {
    const getData = await fetchData();
    console.log(getData.data);
};

main();

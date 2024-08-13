export const getTimeDifference = (updateTime: string) => {
	const timestampMs = Date.parse(updateTime);
	// 获取当前时间
	const now = new Date();
	// 计算时间差
	const timeDifference = now.getTime() - timestampMs; // 这里是以毫秒为单位
	// console.log(updateTime, timeDifference);
	const secondsDifference = Math.floor(timeDifference / 1000); // 以秒为单位
	const minutesDifference = Math.floor(secondsDifference / 60); // 以分钟为单位
	const hoursDifference = Math.floor(minutesDifference / 60); // 以小时为单位
	const daysDifference = Math.floor(hoursDifference / 24); // 以天为单位

	// 根据时间差格式化输出
	let output;
	if (daysDifference > 0) {
		output = `${daysDifference}天前更新`;
	} else if (hoursDifference > 0) {
		output = `${hoursDifference}小时前更新`;
	} else if (minutesDifference > 0) {
		output = `${minutesDifference}分钟前更新`;
	} else {
		output = '刚刚更新';
	}

	return output;
};

export default function fitText(rate, parent, ...texts)
{
	function isOverflown(element) 
	{
		return element.scrollWidth > element.clientWidth;
	}

	let fontSize = (() =>
	{
		let total = 0;
		for (let i = 0; i < texts.length; i++)
		{
			total += parseFloat(window.getComputedStyle(texts[i], null).getPropertyValue("font-size"));
		}
		
		return total / texts.length;
	})();

	while (isOverflown(parent))
	{
		fontSize -= rate;
		texts.forEach(text => text.style.fontSize = fontSize + "px");

		// For debugging
		if (fontSize === 0) break;
	}
}

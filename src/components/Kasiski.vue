<template>
  <div>
    <b-message type="is-info">
        Kasiski 方法猜测的密钥长度受很多因素干扰, 基本就图一乐 (bs
    </b-message>    
    <div class="content is-medium">
      <p>根据 Kasiski 方法猜测的 Vigenère 密钥长度为：<code>{{ gcdResult }}</code>。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Kasiski",
  props: {
    vigenereCryptedText: String
  },
  data() {
    return {
      "gcdResult": 0
    }
  },
  computed: {
    textResult() {
      var obj = {}
      for (let i = 0; i < this.vigenereCryptedText.length-2; i++) {
        const s = this.vigenereCryptedText[i] + this.vigenereCryptedText[i+1] + this.vigenereCryptedText[i+2]
        if (obj[s] !== undefined) {
          obj[s]["frequency"] ++
          obj[s]["location"].push(i)
        } else {
          obj[s] = {
            "frequency": 1,
            "location": [i]
          }
        }
      }
      return obj
    },
    sortedResult() {
      var sortable = [];
      for (let key in this.textResult) {
        sortable.push([key, this.textResult[key]]);
      }
      sortable.sort(function(a, b) {
        return b[1]["frequency"] - a[1]["frequency"]; // 从大到小排
      });
      return sortable
    }
  },
  watch: {
    sortedResult() {
      const t = this.sortedResult[0][1]["location"]
      // console.log(t)
      const len = t.length - 1;
      const r = [];
      for (let i = 0; i < len; i++) {
          r.push(t[i+1] - t[i]);
      }
      // console.log(r)
      this.gcdResult = gcd_more_than_two_numbers(r)
    }
  }
}

function gcd_more_than_two_numbers(input) {
  if (toString.call(input) !== "[object Array]")  
        return  false;  
  var len, a, b;
	len = input.length;
	if ( !len ) {
		return null;
	}
	a = input[ 0 ];
	for ( var i = 1; i < len; i++ ) {
		b = input[ i ];
		a = gcd_two_numbers( a, b );
	}
	return a;
}

function gcd_two_numbers(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}
</script>

<style lang="stylus" scoped>

</style>
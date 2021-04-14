<template>
  <div>
    <div class="content is-medium">
      <p class="maxgcd">
        根据 Kasiski 方法猜测的 Vigenère 密钥长度为：<code>{{ maxGcd }}</code>。
      </p>
      <b-collapse
        aria-id="kasiskipanel"
        class="panel"
        animation="slide"
        v-model="isOpen"
      >
        <template #trigger>
          <div class="panel-heading" role="button" aria-controls="kasiskipanel">
            结果表格
          </div>
        </template>
        <b-table
          :data="results"
          :columns="columns"
          :mobile-cards="false"
        ></b-table>
      </b-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "Kasiski",
  props: {
    vigenereCryptedText: String,
  },
  data() {
    return {
      isOpen: false,
      columns: [
        {
          field: "word",
          label: "字符",
          sortable: true,
        },
        {
          field: "gcd",
          label: "最大公因数",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    results() {
      if (this.vigenereCryptedText.length < 5) {
        return [];
      }
      var result = [];
      for (var i = 2; i < 5; i++) {
        const freq_obj = certain_length_frequency(this.vigenereCryptedText, i);
        const sorted = get_sorted_tuples(freq_obj);
        for (var j = 0; j < 3; j++) {
          const gcd = get_gcd_from_locations(sorted[j][1]["location"]);
          const word = sorted[j][0];
          result.push({
            word: word,
            gcd: gcd,
          });
        }
      }
      return result;
    },
    maxGcd() {
      var max = 0
      for (let i of this.results) {
        if (i.gcd > max) {
          max = i.gcd
        }
      }
      return max
    }
  },
};

/**
 * 获取 text 中 len 长字符组的频率和位置信息
 * @param {String} text
 * @param {Number} len
 * @return {Object}
 */
function certain_length_frequency(text, len) {
  var obj = {};
  for (let i = 0; i < text.length - len + 1; i++) {
    const s = text.slice(i, i + len);
    if (obj[s] !== undefined) {
      obj[s]["frequency"]++;
      obj[s]["location"].push(i);
    } else {
      obj[s] = {
        frequency: 1,
        location: [i],
      };
    }
  }
  return obj;
}

/**
 * 返回一个按照频率从高到低排序的列表, 形似
 * [[str, {freq: 3, location: [xx, ..]}], [str, {freq: 2, location: [xx, xx]}], ...]
 * @param {Object} certain_length_frequency_OBJECT
 * @return {Array}
 */
function get_sorted_tuples(freq_obj) {
  var sortable = [];
  for (let key in freq_obj) {
    sortable.push([key, freq_obj[key]]);
  }
  sortable.sort(function (a, b) {
    return b[1]["frequency"] - a[1]["frequency"]; // 从大到小排
  });
  return sortable;
}

function get_gcd_from_locations(locations_list) {
  const t = locations_list;
  const len = t.length - 1;
  const r = [];
  for (let i = 0; i < len; i++) {
    r.push(t[i + 1] - t[i]);
  }
  return gcd_more_than_two_numbers(r);
}

function gcd_more_than_two_numbers(input) {
  if (toString.call(input) !== "[object Array]") return false;
  var len, a, b;
  len = input.length;
  if (!len) {
    return null;
  }
  a = input[0];
  for (var i = 1; i < len; i++) {
    b = input[i];
    a = gcd_two_numbers(a, b);
  }
  return a;
}

function gcd_two_numbers(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}
</script>

<style lang="stylus" scoped>
.maxgcd
  padding-bottom 20px
</style>
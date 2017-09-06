export const string = "<h3 id=\"usage\">Usage</h3>"+
"\n<pre><code class=\"lang-typescript\">import { FileSelectDirective, FileDropDirective, FileUploader } from &#39;angular-file/angular-file&#39;;"+
"\n</code></pre>"+
"\n<h3 id=\"annotations\">Annotations</h3>"+
"\n<pre><code class=\"lang-typescript\">// class FileSelectDirective"+
"\n@Directive({ selector: &#39;[ngfSelect]&#39; })"+
"\n</code></pre>"+
"\n<pre><code class=\"lang-typescript\">// class FileDropDirective"+
"\n@Directive({ selector: &#39;[ngfDrop]&#39; })"+
"\n</code></pre>"+
"\n<h2 id=\"fileselect-api\">FileSelect API</h2>"+
"\n<h3 id=\"properties\">Properties</h3>"+
"\n<ul>"+
"\n<li><p><code>uploader</code> - (<code>FileUploader</code>) - uploader object. See using in <a href=\"https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts\">demo</a></p>"+
"\n<p>Parameters supported by this object:</p>"+
"\n</li>"+
"\n<li><p><code>url</code> - URL of File Uploader&#39;s route</p>"+
"\n</li>"+
"\n<li><code>authToken</code> - auth token that will be applied as &#39;Authorization&#39; header during file send.</li>"+
"\n<li><code>disableMultipart</code> - If &#39;true&#39;, disable using a multipart form for file upload and instead stream the file. Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.</li>"+
"\n</ul>"+
"\n<h2 id=\"filedrop-api\">FileDrop API</h2>"+
"\n<h3 id=\"properties\">Properties</h3>"+
"\n<ul>"+
"\n<li><code>uploader</code> - (<code>FileUploader</code>) - uploader object. See using in <a href=\"https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts\">demo</a></li>"+
"\n</ul>"+
"\n<h3 id=\"events\">Events</h3>"+
"\n<ul>"+
"\n<li><code>fileOver</code> - it fires during &#39;over&#39; and &#39;out&#39; events for Drop Area; returns <code>boolean</code>: <code>true</code> if file is over Drop Area, <code>false</code> in case of out."+
"\nSee using in <a href=\"https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts\">ts demo</a> and"+
"\n<a href=\"https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.html\">html demo</a></li>"+
"\n</ul>"+
"\n"
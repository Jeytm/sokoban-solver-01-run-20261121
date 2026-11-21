import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function S(t){
const L=t.split('\n').filter(r=>r.length),H=L.length,W=L[0].length,A=new Uint8Array(W*H).fill(1);
let B=[],GL=[],P=-1;
t=L.join('');
for(let i=0;i<t.length;i++){let c=t[i];if(c=='#')continue;A[i]=0;if('.*+'.includes(c))GL.push(i);if('$*'.includes(c))B.push(i);if('@+'.includes(c))P=i}
const R=(P/W)|0,O=[-W,W,-1,1];
const walk=(a,b,pa,bl)=>{
let v=new Set([a]),s=[[a,'']];
while(s.length){let[c,m]=s.pop();if(c==b)return m;for(let k=0;k<4;k++){let n=c+O[k];if(pa(n)&&!bl.includes(n)&&!v.has(n)){v.add(n);s.push([n,m+'udlr'[k]])}}}
return null};
const room=(F,b0,g0,s)=>{
let rg=(p,z)=>{let e=new Uint8Array(W*H);e[p]=1;let o=[p];for(let i=0;i<o.length;i++)for(let k=0;k<4;k++){let x=o[i]+O[k];if((F[x]||x==s)&&!z.includes(x)&&!e[x]){e[x]=1;o.push(x)}}return e};
let dc=c=>!g0.includes(c)&&((A[c-W]&&A[c-1])||(A[c-W]&&A[c+1])||(A[c+W]&&A[c-1])||(A[c+W]&&A[c+1]));
let key=(b,r)=>b.join()+'|'+r;
let b0s=[...b0].sort((a,b)=>a-b),e0=rg(s,b0s),k0=key(b0s,e0.findIndex(Boolean)),nd=new Map([[k0,null]]),q=[[b0s,s,k0]],qi=0,gn=null;
while(qi<q.length){
let[b,p,k]=q[qi++];
if(b.every(x=>g0.includes(x))){gn=[b,p,k];break}
let e=rg(p,b);
for(let i=0;i<b.length;i++){let bx=b[i];for(let j=0;j<4;j++){let o=O[j],bh=bx-o,ah=bx+o;
if(!e[bh])continue;
if(!F[ah]||b.includes(ah)||dc(ah))continue;
let nb=[...b];nb[i]=ah;nb.sort((a,b)=>a-b);
let ne=rg(bx,nb),nk=key(nb,ne.findIndex(Boolean));
if(nd.has(nk))continue;
nd.set(nk,[k,bx*4+j]);
q.push([nb,bx,nk])}}}
if(!gn)return null;
let ps=[];for(let x=gn[2];nd.get(x)!==null;x=nd.get(x)[0])ps.push(nd.get(x)[1]);ps.reverse();
let pl=s,bx=[...b0s],m='';
for(let p of ps){let b=(p/4)|0,k=p%4,o=O[k],bh=b-o;
let w=walk(pl,bh,n=>F[n]||n==s,bx);if(w===null)return null;
m+=w+'udlr'[k];bx[bx.indexOf(b)]=b+o;pl=b}
return{m,end:pl}};
let mv='',pos=P;
for(let x=0;x<W;x++)for(let dr of[(R-1)*W+x,(R+1)*W+x]){
if(A[dr])continue;
let F=new Uint8Array(W*H);F[dr]=1;let q=[dr];
for(let i=0;i<q.length;i++){let c=q[i];for(let k=0;k<4;k++){let n=c+O[k];if(((n/W)|0)==R||A[n]||F[n])continue;F[n]=1;q.push(n)}}
let rb=B.filter(b=>F[b]),rg2=GL.filter(g=>F[g]);
if(rb.length!=rg2.length)return'';
let ha=dr+(dr<R*W?W:-W);
for(;pos<ha;pos++)mv+='r';for(;pos>ha;pos--)mv+='l';
let r=room(F,rb,rg2,ha);if(!r)return'';mv+=r.m;pos=r.end;
let ew=walk(pos,dr,n=>F[n],rg2);if(ew===null)return'';mv+=ew+'udlr'[dr<R*W?1:0];pos=ha}
return mv}
for(const id of readdirSync(I)){
const m=S(readFileSync(I+'/'+id+'/level.txt','utf8'));
mkdirSync(O+'/'+id,{recursive:true});
writeFileSync(O+'/'+id+'/solution.txt',m+'\n')}

pay <- read.csv("M:/106s/cloud/hw1/hw1/aa.csv", header=F)
colnames(pay) <- c("year",cityname)
birth <- read.csv("M:/106s/cloud/hw1/hw1/a2.csv", header=T)
pay  <- pay[, -(23:24)]
birth <- birth[2:19, 1:22]

install.packages("testforDEP",repos="http://cran.us.r-project.org")
library(testforDEP)

cor_city <- c()
cor_year <- c()
col_h <- c()
hoe_p_city <- c()
hoe_d_city <- c()
hoe_p_year <- c()
hoe_d_year <- c()
mar_p <- c()
mann_birth_p <- c()
mann_birth_w <- c()
wil_pair_p <- c()
wil_pair_w <- c()
all_agr <- 0
all_neg <- 0
p_agr_b_neg <- 0
p_neg_b_agr <- 0

#test1-1
windows()
plot(1, type="n", xaxt="n", xlab="", ylab="p-value", main = "p-value for hoeffding test for 18 years", ylim=c(0, 1), xlim=c(0, 45))
abline(h=0.05)
for (i in 2:22){
  hoe_p_city[i-1] <- hoeffd(pay [, i], birth[, i])$P[1, 2]
  hoe_d_city[i-1] <- hoeffd(pay [, i], birth[, i])$D[1, 2]
  cor_city[i-1] <- cor(as.numeric(pay [, i]), as.numeric(birth[, i]))
  col_h[i-1] <- ifelse(hoe_p_city[i-1] <= 0.05, "red", "black")
  points(x=2*i-1, y=hoe_p_city[i-1], col=col_h[i-1])
  text(x=2*i-1, y=hoe_p_city[i-1]-0.03, labels=cityname[i-1], cex=0.7, col=col_h[i-1])
}
windows()
plot(1, type="n", xaxt="n", yaxt="n", xlab="", ylab="", main = paste("hoeffding test and cor btw birth and pay", "for all the cities", sep="\n"), ylim=c(0, 22), xlim=c(0, 4))
abline(v=1:3)
abline(h=1:21)
for (i in 1:21){
  text(0.5, i-0.5, labels=cityname[i], col = col_h[i])
  text(1.5, i-0.5, labels=round(hoe_d_city[i], 4), col=col_h[i])
  text(2.5, i-0.5, labels=round(hoe_p_city[i], 4), col=col_h[i])
  text(3.5, i-0.5, labels=round(cor_city[i], 4), col=col_h[i])
}
text(0.5, 21.9, labels="city")
text(1.5, 21.9, labels=paste("statistic" ,"D", sep="\n"))
text(2.5, 21.9, labels="p-value")
text(3.5, 21.9, labels="cor(pay, birth)")

#test1-2
for (i in 1:18){
  hoe_p_year[i] <- hoeffd(as.numeric(pay[i, -1]), as.numeric(birth[i, -1]))$P[1, 2]
  hoe_d_year[i] <- hoeffd(as.numeric(pay[i, -1]), as.numeric(birth[i, -1]))$D[1, 2]
  cor_year[i] <- cor(as.numeric(pay[i, -1]), as.numeric(birth[i, -1]))
  }
hoe_p_year <- round(hoe_p_year, 4)
hoe_d_year <- round(hoe_d_year, 4)
cor_year <- round(cor_year, 4)

windows()
col_h_year <- ifelse(hoe_p_year <= 0.05, "red", "black")
plot(x=as.numeric(pay[, 1]),hoe_p_year, xlab="", ylab="p-value", main = "p-value for hoeffding test for 18 years", ylim=c(0, 1), xlim=c(1998, 2017), col=col_h_year)
abline(h=0.05)

windows()
plot(1, type="n", xaxt="n", yaxt="n", xlab="", ylab="", main = paste("hoeffding test and cor btw birth and pay", "for all years", sep="\n"), ylim=c(0, 19), xlim=c(0, 4))
abline(v=1:3)
abline(h=1:18)
for(i in 1:18){
  text(0.5, i-0.5, labels = i+1998, col=col_h_year[i])                   
  text(1.5, i-0.5, labels = hoe_d_year[i] , col=col_h_year[i])
  text(2.5, i-0.5, labels = hoe_p_year[i] , col=col_h_year[i])
  text(3.5, i-0.5, labels = cor_year[i] , col=col_h_year[i])
}
text(0.5, 18.9, labels = "year")
text(1.5, 18.9, labels = paste("statistic" ,"D", sep="\n"))  
text(2.5, 18.9, labels = "p-value")                   
text(3.5, 18.9, labels = paste("cor btw ", "birth and pay", sep="\n"))  


#test1-3
windows()
par(mfrow=c(1,2)) 
plot(1, type="n", xaxt="n", yaxt="n", xlab="", ylab="", main = paste("cor btw birth and pay", paste("for the cities", "that birth and pay are depandent",sep="\n"), sep="\n"), ylim=c(0, 6), xlim=c(0, 1))
abline(h=c(1:5))
abline(v=0.5)
for(i in 1:5){
  id_city <- c(7, 8, 10, 19, 21)
  id_city_name <- c("臺南市", "高雄市", "新竹縣", "澎湖縣", "新竹市")
  cor_city[i] <- round(cor(pay [, id_city[i]], birth[, id_city[i]]), 4)
  text(0.75, i-0.5, labels = cor_city[i])                   
  text(0.25, i-0.5, labels = id_city_name [i])
}
text(0.75, 5.5, labels = paste("cor btw ", "birth and pay", sep="\n"))                   
text(0.25, 5.5, labels = "city")

plot(1, type="n", xaxt="n", yaxt="n", xlab="", ylab="", main = paste("cor btw birth and pay", paste("for the years", "that birth and pay are depandent",sep="\n"), sep="\n"), ylim=c(0, 7), xlim=c(0, 1))
abline(h=c(1:6))
abline(v=0.5)

for(i in 1:6){
  cor_year[i] <- round(cor(as.numeric(pay[i+12, -1]), as.numeric(birth[i+12, -1])), 4)
  text(0.75, i-0.5, labels = cor_year[i])                   
  text(0.25, i-0.5, labels = i+2010)
}
text(0.75, 6.5, labels = paste("cor btw ", "birth and pay", sep="\n"))                   
text(0.25, 6.5, labels = "year")

windows()
plot(1, xaxt="n", yaxt="n" ,type="n", main = paste("2016 table for agreement","p-value for Mcnemar test is 0.617", sep = "\n") , ylim=c(0, 1), xlim=c(0, 1), frame = T, ylab="payment isn't higher than country v.s. payment is higher than country", xlab="birth isn't higher than country v.s. birth is higher than country")
abline(v=0.5)
abline(h=0.5)

for (i in 1:18){
  pay_compare <- as.vector(ifelse(pay[i, -(1:2)]>pay[i, 2], 1, 0))
  birth_compare <- as.vector(ifelse(birth[i, -(1:2)]>birth[i, 2], 1, 0))
  mar_p[i] <- mcnemar.test(pay_compare, birth_compare )$p.value
}
all_agr <- 0
all_neg <- 0
p_agr_b_neg <- 0
p_neg_b_agr <- 0
for (i in 1:20){
  if (pay_compare[i]==1&birth_compare[i]==1) (all_agr <- all_agr+1)else (all_agr <- all_agr)
  if (pay_compare[i]==0&birth_compare[i]==0) (all_neg <- all_neg+1)else (all_neg <- all_neg)
  if (pay_compare[i]==1&birth_compare[i]==0) (p_agr_b_neg  <- p_agr_b_neg +1)else (p_agr_b_neg  <- p_agr_b_neg )
  if (pay_compare[i]==0&birth_compare[i]==1) (p_neg_b_agr <- p_neg_b_agr+1)else (p_neg_b_agr <- p_neg_b_agr)
}
  text(0.25, 0.25, labels = all_neg)
  text(0.75, 0.25, labels = p_neg_b_agr)
  text(0.25, 0.75, labels = p_agr_b_neg )
  text(0.75, 0.75, labels = all_agr)
  text(0.25, 0.1, labels=paste("specitivity=", round(all_neg/(all_neg+p_agr_b_neg ), 2)))
  text(0.75, 0.6, labels=paste("sensitivity=", round(all_agr/(all_agr+p_neg_b_agr ), 2)))

windows()
plot(1, type="n", xaxt="n", yaxt="n", xlab="", ylab="", main = "statistics about Mcnemar test", ylim=c(0, 19), xlim=c(0, 7))
abline(v=1:6)
abline(h=1:18)
for (i in 1:18){
  all_agr <- 0
  all_neg <- 0
  p_agr_b_neg <- 0
  p_neg_b_agr <- 0    
  pay_compare <- as.vector(ifelse(pay[i, -(1:2)]>pay[i, 2], 1, 0))
  birth_compare <- as.vector(ifelse(birth[i, -(1:2)]>birth[i, 2], 1, 0))
  for (j in 1:20){
    if (pay_compare[j]==1&birth_compare[j]==1) (all_agr <- all_agr+1)else (all_agr <- all_agr)
    if (pay_compare[j]==0&birth_compare[j]==0) (all_neg <- all_neg+1)else (all_neg <- all_neg)
    if (pay_compare[j]==1&birth_compare[j]==0) (p_agr_b_neg  <- p_agr_b_neg +1)else (p_agr_b_neg  <- p_agr_b_neg )
    if (pay_compare[j]==0&birth_compare[j]==1) (p_neg_b_agr <- p_neg_b_agr+1)else (p_neg_b_agr <- p_neg_b_agr)
  }
  mar_p[i] <- round(mcnemar.test(pay_compare, birth_compare )$p.value, 4)
  mar_m[i] <- round(mcnemar.test(pay_compare, birth_compare )$statistic, 4)
  col_mar[i] <- if (mar_p[i] <0.05) ("red") else ("black")
  text(0.5, i-0.5, labels=as.vector(pay[, 1])[i], col = col_mar)
  text(1.5, i-0.5, labels=(all_agr+all_neg), col=col_mar)
  text(2.5, i-0.5, labels=(p_agr_b_neg+p_neg_b_agr), col=col_mar)
  text(3.5, i-0.5, labels=round(all_agr/(all_agr+p_neg_b_agr), 4), col=col_mar)
  text(4.5, i-0.5, labels=round(all_neg/(all_neg+p_agr_b_neg), 4), col=col_mar)
  text(5.5, i-0.5, labels=mar_m[i], col=col_mar)
  text(6.5, i-0.5, labels=mar_p[i], col=col_mar)
}
text(0.5, 18.75, labels="year")
text(1.5, 18.75, labels="agreement", cex=0.8)
text(2.5, 18.75, labels="disagreement", cex=0.7)
text(3.5, 18.75, labels="sensitivity", cex=0.8)
text(4.5, 18.75, labels="specitivity", cex=0.8)
text(5.5, 18.9, labels=paste("statistic", "M", sep="\n"), cex=0.8)
text(6.5, 18.75, labels="p-value")

plot(x=as.numeric(pay[, 1]), y=mar_p, xlab="", ylab="p-value", main = "p-value for Mcnemar test for 18 years", ylim=c(0, 1), xlim=c(1998, 2017), col=col_mar)
abline(h=0.05) 

#TEST3
birth_n <- birth[, c(3:6, 9:11, 13, 20:21)]
birth_s<- birth[, c(7:8, 12, 14:16, 19, 22)]
windows()

for (i in 1:18){
  mann_birth_p[i] <- wilcox.test(as.numeric(birth_n[i, ]), as.numeric(birth_s[i, ]))$p.value
  mann_birth_w[i] <- wilcox.test(as.numeric(birth_n[i, ]), as.numeric(birth_s[i, ]))$statistic
}

mann_birth_p <- unlist(mann_birth_p)
col_m <- ifelse(mann_birth_p<0.05, "red", "black")
plot(y=mann_birth_p, x=as.vector(pay[, 1]), xlab="year", ylab="p-value", main = "p-value for birth location test", ylim=c(0, 1), xlim=c(1998, 2017), col=col_m)
abline(h=0.05)

plot(1, type="n", xaxt="n", yaxt="n", xlab="", ylab="", main = paste("difference birth rate", paste("btw northern and southern Taiwan", "H0:birth(year,north)=birth(year,south)",sep="\n"), sep="\n"), ylim=c(0, 19), xlim=c(0, 3))
abline(v=1:2)
abline(h=1:18)
for (i in 1:18){
  text(0.5, i-0.5, labels=as.vector(pay[, 1])[i], col = col_m[i])
  text(1.5, i-0.5, labels=round(mann_birth_w[i], 4), col=col_m[i])
  text(2.5, i-0.5, labels=round(mann_birth_p[i], 4), col=col_m[i])
}
text(0.5, 18.5, labels="year")
text(1.5, 18.9, labels=paste("statistic" ,"W", sep="\n"))
text(2.5, 18.5, labels="p-value")

#test4
windows()
for (i in 1:18){
  wil_pair_p[i] <-ifelse(i < 18, wilcox.test(as.numeric(birth[i, ]), as.numeric(birth[18, ]), paired = T)$p.value, "null") 
  wil_pair_w[i] <-ifelse(i < 18, wilcox.test(as.numeric(birth[i, ]), as.numeric(birth[18, ]), paired = T)$statistic, "null") 
  }
wil_pair_p <- round(as.numeric(wil_pair_p ), 4)
wil_pair_w <- round(as.numeric(wil_pair_w ), 4)
col_w <- ifelse(wil_pair_p<0.05, "red", "black")
plot(y=wil_pair_p , x=as.vector(pay[, 1]), xlab="year", ylab="p-value", main = "p-value for birth rate compare to this year test", ylim=c(0, 1), xlim=c(1998, 2017), col=col_w)
abline(h=0.05)

plot(1, type="n", xaxt="n", yaxt="n", xlab="", ylab="", main = paste("difference birth rate", paste("btw 2016 and other years", "H0:birth(2016)=birth(other year)",sep="\n"), sep="\n"), ylim=c(0, 18), xlim=c(0, 3))
abline(v=1:2)
abline(h=1:17)
for (i in 1:17){
  text(0.5, i-0.5, labels=as.vector(pay[, 1])[i], col = col_w[i])
  text(1.5, i-0.5, labels=round(wil_pair_w[i], 4), col=col_w[i])
  text(2.5, i-0.5, labels=round(wil_pair_p[i], 4), col=col_w[i])
}
text(0.5, 17.5, labels="year")
text(1.5, 17.9, labels=paste("statistic" ,"W", sep="\n"))
text(2.5, 17.5, labels="p-value")